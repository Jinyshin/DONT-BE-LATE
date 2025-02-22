// src/appointments/dto/get-appointment-detail.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class GetAppointmentDetailDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  penalty: string;

  @ApiProperty()
  latecheckins: {name: string, latency:number,}[];

  @ApiProperty()
  earlycheckins: {name: string, latency:number,}[];

  @ApiProperty()
  incompletecheckins: {name: string}[];

  @ApiProperty()
  meet_at: Date;

  @ApiProperty()
  time_left: number;
}
