import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/participations')
@ApiTags('Participations')
export class ParticipationsController {
  constructor(private readonly participationsService: ParticipationsService) {}

  @Post()
  create(@Body() createParticipationDto: CreateParticipationDto) {
    return this.participationsService.create(createParticipationDto);
  }

  @Get()
  findAll() {
    return this.participationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participationsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participationsService.remove(+id);
  }
}
