import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  gid: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  meet_at: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  penalty: string;
}
