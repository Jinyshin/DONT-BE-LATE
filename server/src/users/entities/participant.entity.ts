import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { User } from './user.entity';

export class Participant {
  @ApiProperty()
  aid: number;

  @ApiProperty()
  uid: number;

  @ApiProperty()
  user: User;

  @ApiProperty()
  appointment: Appointment;

  @ApiProperty()
  is_deleted: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
