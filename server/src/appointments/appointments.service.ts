import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: number) {
    // 약속 엔티티 생성 및 저장
    const appointment = await this.prisma.appointments.create({
      data: {
        ...createAppointmentDto,
        meet_at: new Date(createAppointmentDto.meet_at),
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Participants 테이블에 현재 user 추가
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
  }

  findAll() {
    return `This action returns all appointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
