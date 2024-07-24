import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ApiTags,ApiOperation } from '@nestjs/swagger';
import {PatchAppointmentDto} from './dto/patch-appointment.dto';

@Controller('api/v1/appointments')
@ApiTags('Appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({summary: "userId를 통해 메인에 띄울 약속 받아오기"})
  //findAll(Headers("Authorization") token?: string) {
    findAll() {
    // TODO: JWT에서 userId 추출해서 전달하기
    return this.appointmentsService.findByUserId(1);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }

  @Patch(':aid')
  @ApiOperation({summary:'aid와 참/불참을 받아 업데이트'})
  updateParticipants(
    @Param('aid') aid: string,
    @Body() patchAppointmentDto: PatchAppointmentDto
  ){
    const userId=1;
    return this.appointmentsService.updateParticipants(userId, parseInt(aid), patchAppointmentDto.isParticipating);
  }

}
