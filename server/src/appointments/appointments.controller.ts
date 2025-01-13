import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { authorize } from 'src/utils/jwt-auth';
import { AppointmentsService } from './appointments.service';
import { CheckinResponseDto } from './dto/checkin-response.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetAppointmentDetailDto } from './dto/get-appointment-detail.dto';
import { PatchAppointmentDto } from './dto/patch-appointment.dto';

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
    @Headers('Authorization') authorization?: string,
  ): Promise<CheckinResponseDto> {
    const { id: uid } = await authorize(this.jwtService, authorization);
    return this.appointmentsService.createCheckin(id, uid);
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
  async getMyAppointments(@Headers('Authorization') authorization?: string) {
    const { id: uid } = await authorize(this.jwtService, authorization);
    return this.appointmentsService.getMyAppointments(uid);
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

  @Get(':aid')
  @ApiOperation({ summary: '약속 상세 조회' })
  findOne(@Param('aid') id: string): Promise<GetAppointmentDetailDto> {
    return this.appointmentsService.findDetail(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }

  @Patch(':aid')
  @ApiOperation({ summary: 'aid와 참/불참을 받아 업데이트' })
  async updateParticipants(
    @Param('aid') aid: string,
    @Body() patchAppointmentDto: PatchAppointmentDto,
    @Headers('Authorization') authorization?: string,
  ) {
    const { id: uid } = await authorize(this.jwtService, authorization);

    return this.appointmentsService.updateParticipants(
      uid,
      parseInt(aid),
      patchAppointmentDto.isParticipating,
    );
  }
}
