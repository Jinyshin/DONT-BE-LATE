import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateGroupMemberDto } from './dto/create-groupmember.dto';
import { GroupMemberResponseDto } from './dto/group-member-response.dto';
import { authorize } from 'src/utils/jwt-auth';
import { AppointmentsService } from '../appointments/appointments.service';
import { GetGroupAppointmentDto} from '../appointments/dto/get-group-appointments.dto'

@Controller('api/v1/groups')
@ApiTags('Groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService,
    private readonly jwtService: JwtService,
    private readonly appointmentsService: AppointmentsService, e) {}

  @Post()
  @ApiOperation({ summary: '새 그룹 생성' })
  async create(
    @Body() createGroupDto: CreateGroupDto,
    @Headers('Authorization') authorization?: string,
  ) {
    const { id } = await authorize(this.jwtService, authorization);
    return this.groupsService.create(createGroupDto, id);
  }

  @Post('/join')
  @ApiOperation({ summary: '그룹 참여' })
  async createGroupMember(
    @Body() createGroupMemberDto: CreateGroupMemberDto,
    @Headers('Authorization') authorization?: string,
  ): Promise<GroupMemberResponseDto> {
    const { id } = await authorize(this.jwtService, authorization);
    return this.groupsService.createGroupMember(
      createGroupMemberDto.groupCode,
      id,
    );
  }
  // TODO: 주석 해제 후 토큰 추가`
  // async createGroupMember(
  //   @Body() createGroupMemberDto: CreateGroupMemberDto,
  //   @Headers('Authorization') token: string,
  // ): Promise<GroupMemberResponseDto> {
  //   if (!token) {
  //     throw new UnauthorizedException('No token provided');
  //   }

  //   try {
  //     const userId = await this.groupsService.verifyTokenAndGetUserId(token);
  //     return this.groupsService.createGroupMember(
  //       createGroupMemberDto.groupCode,
  //       userId,
  //     );
  //   } catch (error) {
  //     if (
  //       error instanceof UnauthorizedException ||
  //       error instanceof ForbiddenException
  //     ) {
  //       throw error;
  //     }
  //     throw new ForbiddenException('Invalid token or user not allowed');
  //   }
  // }

  @Get()
  @ApiOperation({ summary: '전체 그룹 목록 조회' })
  async findAll(@Headers('Authorization') authorization?: string) {
    const { id } = await authorize(this.jwtService, authorization);
    return await this.groupsService.findAll(id);
  }

  @Get(':gid')
  @ApiOperation({ summary: '그룹 초대 링크' })
  async findOne(
    @Param('gid') id: string,
    @Headers('Authorization') authorization?: string,
  ) {
    const { id: uid } = await authorize(this.jwtService, authorization);
    return this.groupsService.findOne(+id, uid);
  }

  @Get(':gid/appointments')
  @ApiOperation({summary: '그룹 내 모든 약속'})
  findAllAppointments(@Param('gid') gid: string):Promise<GetGroupAppointmentDto[]>{
    const userId=1;
    return this.appointmentsService.findAllAppByGroup(parseInt(gid),userId);
  }

}
