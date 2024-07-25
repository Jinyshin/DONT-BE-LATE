// src/appointments/dto/appointment-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class GetGroupAppointmentDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  meet_at: Date;

  @ApiProperty()
  location: string;

  @ApiProperty({ type: [String] })
  profileurl: string[];

  @ApiProperty()
  participated: boolean;
}
