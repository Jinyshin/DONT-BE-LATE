import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Appointment } from './appointment.entity';

export class Checkin {
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
