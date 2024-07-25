import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Participant } from 'src/users/entities/participant.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CheckinResponseDto } from './dto/checkin-response.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: number) {
    try {
      const appointment = await this.prisma.appointments.create({
        data: {
          ...createAppointmentDto,
          meet_at: new Date(createAppointmentDto.meet_at),
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      await this.prisma.participants.create({
        data: {
          aid: appointment.id,
          uid: userId,
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
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
    const existingCheckin = await this.prisma.checkins.findUnique({
      where: { aid_uid: { aid, uid } },
    });

    if (existingCheckin) {
      throw new ConflictException('User is already checked in');
    }

    // 해당 약속이 존재하는지 확인
    const appointment = await this.prisma.appointments.findUnique({
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
    const checkin = await this.prisma.checkins.create({
      data: {
        aid,
        uid,
        is_deleted: false,
        created_at: seoulTime,
        updated_at: seoulTime,
      },
    });

    // 시간 차이 계산
    const timeDifference =
      (seoulTime.getTime() - new Date(appointment.meet_at).getTime()) / 1000;

    return {
      time_difference: timeDifference,
    };
  }

  async getMyAppointments(userId: number) {
    const appointments = await this.prisma.appointments.findMany({
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
    let participant = await this.prisma.participants.findUnique({
      where: {
        aid_uid: {
          aid: aid,
          uid: userId,
        },
      },
    });

    if (participant) {
      participant = await this.prisma.participants.update({
        where: {
          aid_uid: {
            aid: aid,
            uid: userId,
          },
        },
        data: {
          is_deleted: !isParticipating,
          updated_at: new Date(),
        },
      });
    } else {
      participant = await this.prisma.participants.create({
        data: {
          aid: aid,
          uid: userId,
          is_deleted: !isParticipating,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    }

    return participant as Participant;
  }
}
