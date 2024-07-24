import { ApiProperty } from '@nestjs/swagger';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';

export class GroupMember {
  constructor(partial: Partial<GroupMember>) {
    Object.assign(this, partial);
  }
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
