// src/appointments/dto/patch-appointment.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class PatchAppointmentDto {
  @ApiProperty()
  @IsBoolean()
  isParticipating: boolean;
}