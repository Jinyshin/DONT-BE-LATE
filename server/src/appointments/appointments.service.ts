import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Participant } from 'src/users/entities/participant.entity';
import { CheckinResponseDto } from './dto/checkin-response.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetAppointmentDetailDto } from './dto/get-appointment-detail.dto';
import { GetGroupAppointmentDto } from './dto/get-group-appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: number) {
    try {
      const appointment = await this.prisma.appointment.create({
        data: {
          ...createAppointmentDto,
          meet_at: new Date(createAppointmentDto.meet_at),
          is_deleted: false,
          created_at: new Date(),
        },
      });

      await this.prisma.participant.create({
        data: {
          aid: appointment.id,
          uid: userId,
          is_deleted: false,
          created_at: new Date(),
        },
      });

      return appointment;
    } catch (error) {
      console.error(error);
      throw new Error('Appointment creation failed');
    }
  }

  async createCheckin(aid: number, uid: number): Promise<CheckinResponseDto> {
    // 이미 체크인 되어있는지 확인
    const existingCheckin = await this.prisma.checkin.findUnique({
      where: { aid_uid: { aid, uid } },
    });

    if (existingCheckin) {
      throw new ConflictException('User is already checked in');
    }

    // 해당 약속이 존재하는지 확인
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: aid, is_deleted: false },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    // 현재 시간을 Asia/Seoul 시간대로 변환하여 저장
    const now = new Date();
    const seoulTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
    );

    // 체크인 정보 저장
    const checkin = await this.prisma.checkin.create({
      data: {
        aid,
        uid,
        is_deleted: false,
        created_at: seoulTime,
      },
    });

    // 시간 차이 계산
    const timeDifference =
      (seoulTime.getTime() - new Date(appointment.meet_at).getTime()) / 1000;

    const { gid } = appointment;
    const year = new Date(appointment.meet_at).getFullYear();
    const month = new Date(appointment.meet_at).getMonth() + 1;
    await this.prisma.ranking.upsert({
      where: {
        gid_uid_year_month: { gid, uid, year, month },
      },
      create: { gid, uid, year, month },
      update: {
        accumulated_time: {
          increment: timeDifference,
        },
      },
    });

    return {
      time_difference: timeDifference,
    };
  }

  async getMyAppointments(userId: number) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        is_deleted: false,
        users: {
          some: {
            uid: userId,
            is_deleted: false,
          },
        },
      },
      select: {
        id: true,
        title: true,
        location: true,
        meet_at: true,
        group: {
          select: {
            name: true,
          },
        },
        users: {
          select: {
            user: {
              select: {
                profile_url: true,
              },
            },
          },
        },
        checkins: {
          where: {
            uid: userId,
            is_deleted: false,
          },
        },
      },
    });

    return appointments.map((appointment) => ({
      id: appointment.id,
      title: appointment.title,
      location: appointment.location,
      meet_at: appointment.meet_at,
      group_name: appointment.group.name,
      participants: appointment.users.map((user) => user.user.profile_url),
      checked_in: appointment.checkins.length > 0,
    }));
  }

  async findDetail(aid: number): Promise<GetAppointmentDetailDto> {
    //todo: get arival of time
    try {
      const appointment = await this.prisma.appointment.findUnique({
        where: {
          is_deleted: false,
          id: aid,
        },
        select: {
          title: true,
          meet_at: true,
          penalty: true,
          users: {
            //Participants[]
            select: {
              uid: true,
              is_deleted: true, //확인하기
              user: {
                select: {
                  nickname: true,
                },
              },
            },
          },
          checkins: {
            select: {
              created_at: true,
              is_deleted: true,
              aid: true,
              uid: true,
            },
          },
        },
      });
      const {
        title,
        meet_at,
        penalty,
        users: participants,
        checkins,
      } = appointment;
      const earlycheckins: { name: string; latency: number }[] = [];
      const latecheckins: { name: string; latency: number }[] = [];
      const incompletecheckins: { name: string }[] = [];
      const validPart = participants.filter((p) => !p.is_deleted);

      for (let i = 0; i < validPart.length; i++) {
        const participant = validPart[i];
        const thecheckin = checkins.find((c) => c.uid == participant.uid);
        if (!thecheckin || thecheckin.is_deleted) {
          incompletecheckins.push({ name: participant.user.nickname });
        } else {
          const latency =
            (new Date(thecheckin.created_at).getTime() -
              new Date(appointment.meet_at).getTime()) /
            1000;
          if (latency > 0) {
            latecheckins.push({
              name: participant.user.nickname,
              latency: latency,
            });
          } else {
            earlycheckins.push({
              name: participant.user.nickname,
              latency: latency,
            });
          }
        }
      }

      earlycheckins.sort((a, b) => a.latency - b.latency);
      latecheckins.sort((a, b) => b.latency - a.latency);
      incompletecheckins.sort((a, b) => a.name.localeCompare(b.name));

      const now = new Date();
      const seoulTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
      );

      const time_left =
        (new Date(seoulTime).getTime() -
          new Date(appointment.meet_at).getTime()) /
        1000;

      return {
        title: title,
        penalty: penalty,
        latecheckins: latecheckins,
        earlycheckins: earlycheckins,
        incompletecheckins: incompletecheckins,
        meet_at: meet_at,
        time_left: time_left,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch appointment details');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }

  async updateParticipants(
    userId: number,
    aid: number,
    isParticipating: boolean,
  ): Promise<Participant> {
    console.log('hi');
    let participant = await this.prisma.participant.findUnique({
      where: {
        aid_uid: {
          aid: aid,
          uid: userId,
        },
      },
    });

    if (participant) {
      participant = await this.prisma.participant.update({
        where: {
          aid_uid: {
            aid: aid,
            uid: userId,
          },
        },
        data: {
          is_deleted: !isParticipating,
        },
      });
    } else {
      participant = await this.prisma.participant.create({
        data: {
          aid: aid,
          uid: userId,
          is_deleted: !isParticipating,
          created_at: new Date(),
        },
      });
    }

    return participant as Participant;
  }

  async findAllAppByGroup(
    gid: number,
    uid: number,
  ): Promise<GetGroupAppointmentDto[]> {
    const appointments = await this.prisma.appointment.findMany({
      where: { gid, is_deleted: false },
      include: {
        users: {
          include: {
            user: true,
          },
        },
        checkins: true,
      },
    });

    return appointments.map((appointment) => {
      // Filter participants who are not deleted
      const activeParticipants = appointment.users.filter(
        (participant) => !participant.is_deleted,
      );

      // Get profile URLs of active participants
      const profileUrls = activeParticipants.map(
        (participant) => participant.user.profile_url,
      );

      // Check if the user has participated
      const participated = activeParticipants.some(
        (participant) => participant.uid === uid,
      );

      return {
        id: appointment.id,
        title: appointment.title,
        meet_at: appointment.meet_at,
        location: appointment.location,
        profileurl: profileUrls,
        participated: participated,
      };
    });
  }
}
