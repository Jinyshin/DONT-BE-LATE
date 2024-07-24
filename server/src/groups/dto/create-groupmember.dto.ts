import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateGroupMemberDto {
  @ApiProperty({
    description: 'Group participation code',
    example: 'ABCDEF',
  })
  @IsString()
  @Length(6, 6, {
    message: 'Participation code must be exactly 6 characters long',
  })
  groupCode: string;
}
