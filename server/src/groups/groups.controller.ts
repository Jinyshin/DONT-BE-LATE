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
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGroupMemberDto } from './dto/create-groupmember.dto';
import { GroupMemberResponseDto } from './dto/group-member-response.dto';

@Controller('api/v1/groups')
@ApiTags('Groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiOperation({ summary: '새 그룹 생성' })
  async create(@Body() createGroupDto: CreateGroupDto) {
    // TODO: JWT에서 userId 추출해서 전달하기
    return this.groupsService.create(createGroupDto, 1);
  }

  @Post('/join')
  @ApiOperation({ summary: '그룹 참여' })
  async createGroupMember(
    @Body() createGroupMemberDto: CreateGroupMemberDto,
  ): Promise<GroupMemberResponseDto> {
    return this.groupsService.createGroupMember(
      createGroupMemberDto.groupCode,
      3,
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
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':gid')
  @ApiOperation({ summary: '그룹 초대 링크' })
  findOne(@Param('gid') id: string) {
    return this.groupsService.findOne(+id);
  }
}
