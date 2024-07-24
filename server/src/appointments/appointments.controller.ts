import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/appointments')
@ApiTags('Appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: '새 약속 생성' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    console.log('됨?');
    // TODO: JWT에서 userId 추출해서 전달하기
    return this.appointmentsService.create(createAppointmentDto, 1);
  }

  @Get()
  @ApiOperation({ summary: '전체 약속 목록 조회' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '약속 상세 조회' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
