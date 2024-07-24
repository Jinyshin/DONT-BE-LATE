import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';
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
}
