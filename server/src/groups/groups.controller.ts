import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/groups')
@ApiTags('Groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiOperation({ summary: '새 그룹 생성' })
  create(@Body() createGroupDto: CreateGroupDto) {
    // TODO: JWT에서 userId 추출해서 전달하기
    return this.groupsService.create(createGroupDto, 1);
  }

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
