import { ApiProperty } from '@nestjs/swagger';

export class GroupMemberResponseDto {
  @ApiProperty()
  gid: number;

  @ApiProperty()
  uid: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  num_participants: number;

  @ApiProperty()
  is_deleted: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
