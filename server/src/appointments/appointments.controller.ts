import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  Delete,
  Patch,
  UnauthorizedException,
  ParseIntPipe,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PatchAppointmentDto } from './dto/patch-appointment.dto';
import { CheckinResponseDto } from './dto/checkin-response.dto';
import { JwtService } from '@nestjs/jwt';

// TODO: JWT에서 userId 추출해서 전달하기

@Controller('api/v1/appointments')
@ApiTags('Appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @ApiOperation({ summary: '새 약속 생성' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto, 1);
  }

  @Post(':id/checkin')
  @ApiOperation({ summary: '약속 체크인' })
  async createCheckin(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CheckinResponseDto> {
    return this.appointmentsService.createCheckin(id, 1);
  }
  // async createCheckin(
  //   @Param('id') id: number,
  //   @Headers('Authorization') token: string,
  // ): Promise<Checkin> {
  //   if (!token) {
  //     throw new UnauthorizedException('No token provided');
  //   }

  //   let userId: number;
  //   try {
  //     const decoded = this.jwtService.verify(token.replace('Bearer ', ''));
  //     userId = decoded.userId;
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid token');
  //   }

  //   return this.appointmentsService.createCheckin(aid, userId);
  // }

  @Get()
  @ApiOperation({ summary: 'userId를 통해 메인에 띄울 약속 받아오기' })
  async getMyAppointments() {
    return this.appointmentsService.getMyAppointments(1);
  }
  // async getMyAppointments(@Headers('Authorization') token: string) {
  //   if (!token) {
  //     throw new UnauthorizedException('No token provided');
  //   }

  //   let userId: number;
  //   try {
  //     const decoded = this.jwtService.verify(token.replace('Bearer ', ''));
  //     userId = decoded.userId;
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid token');
  //   }

  //   return this.appointmentsService.getMyAppointments(userId);
  // }

  @Get(':id')
  @ApiOperation({ summary: '약속 상세 조회' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }

  @Patch(':aid')
  @ApiOperation({ summary: 'aid와 참/불참을 받아 업데이트' })
  updateParticipants(
    @Param('aid') aid: string,
    @Body() patchAppointmentDto: PatchAppointmentDto,
  ) {
    const userId = 2;
    return this.appointmentsService.updateParticipants(
      userId,
      parseInt(aid),
      patchAppointmentDto.isParticipating,
    );
  }
}
