import { ApiProperty } from '@nestjs/swagger';
import { GroupMember } from './group-member.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

export class Group {
  constructor(partial: Partial<Group>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  num_participants: number;

  @ApiProperty()
  participation_code: string;

  @ApiProperty()
  users: GroupMember[];

  @ApiProperty()
  appointments: Appointment[];

  @ApiProperty()
  is_deleted: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
