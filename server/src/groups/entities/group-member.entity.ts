import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Group } from './group.entity';

export class GroupMember {
  @ApiProperty()
  gid: number;

  @ApiProperty()
  uid: number;

  @ApiProperty()
  user: User;

  @ApiProperty()
  group: Group;

  @ApiProperty()
  is_deleted: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
