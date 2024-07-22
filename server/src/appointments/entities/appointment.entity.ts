import { ApiProperty } from '@nestjs/swagger';
import { Group } from 'src/groups/entities/group.entity';
import { Checkin } from './checkin.entity';
import { Participant } from 'src/users/entities/participant.entity';

export class Appointment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  gid: number;

  @ApiProperty({ type: () => [Participant] })
  users: Participant[];

  @ApiProperty({ type: () => Group })
  group: Group;

  @ApiProperty({ type: () => [Checkin] })
  checkins: Checkin[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  meet_at: Date;

  @ApiProperty()
  location: string;

  @ApiProperty()
  panelty: string;

  @ApiProperty()
  is_deleted: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
