import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetGroupAppointmentDto } from './dto/get-group-appointments.dto';
import { Appointment } from './entities/appointment.entity';
import {Participant} from 'src/users/entities/participant.entity';
import { PrismaService } from 'src/prisma/prisma.service';


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

  findAll(){
    return 'findall';
  }
  
  async findByUserId(id: number): Promise<Appointment[]> {
    const participants = await this.prisma.participants.findMany({
      where: {
        uid: id,
        is_deleted: false,
      },
      include: {
        appointment: {
          include: {
            group: {
              include: {
                users: {
                  include: {
                    user: true,
                  },
                },
                appointments: true,
              },
            },
            users: {
              include: {
                user: true,
              },
            },
            checkins: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return participants.map(participant => {
      const { appointment } = participant;
      return {
        ...appointment,
        users: appointment.users.map(user => ({
          ...user,
          user: user.user,
          appointment: undefined,
        })),
        group: {
          ...appointment.group,
          users: appointment.group.users.map(user => ({
            ...user,
            user: user.user,
            group: undefined, // 필요 시 제거
          })),
          appointments: [], // 필요 시 빈 배열로 초기화
        },
        checkins: appointment.checkins.map(checkin => ({
          ...checkin,
          user: checkin.user,
          appointment: undefined,
        })),
      } as unknown as Appointment; // 명시적으로 Appointment 타입으로 캐스팅
    });
  }
  
  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }

  async updateParticipants(userId: number, aid:number, isParticipating:boolean): Promise<Participant>{
    console.log("hi");
    let participant = await this.prisma.participants.findUnique({
      where: {
        aid_uid: {
          aid: aid,
          uid: userId, },
        },
      });

    if(participant){
      participant = await this.prisma.participants.update({
        where: {
          aid_uid: {
            aid:aid,
            uid: userId,
          },
        },
        data: {
          is_deleted: !isParticipating,
          updated_at: new Date(),
        },
      });
    }
    else{
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

  async findAllAppByGroup(gid: number,uid: number): Promise<GetGroupAppointmentDto[]> {

    const appointments = await this.prisma.appointments.findMany({
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

    return appointments.map(appointment => {
      // Filter participants who are not deleted
      const activeParticipants = appointment.users.filter(participant => !participant.is_deleted);
      
      // Get profile URLs of active participants
      const profileUrls = activeParticipants.map(participant => participant.user.profile_url);
      
      // Check if the user has participated
      const participated = activeParticipants.some(participant => participant.uid === uid);

      return {
        title: appointment.title,
        meet_at: appointment.meet_at,
        location: appointment.location,
        profileurl: profileUrls,
        participated: participated,
      };
    });
  }
}
