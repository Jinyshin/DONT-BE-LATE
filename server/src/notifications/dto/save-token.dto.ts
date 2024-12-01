import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SaveTokenDto {
  @ApiProperty({
    description: '클라이언트의 FCM 토큰',
    example: 'fcm-token',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
