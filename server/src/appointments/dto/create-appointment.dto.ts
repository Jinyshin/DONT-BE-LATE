import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
