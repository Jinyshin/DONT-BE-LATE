import { Injectable } from '@nestjs/common';
import { CreateParticipationDto } from './dto/create-participation.dto';

@Injectable()
export class ParticipationsService {
  create(createParticipationDto: CreateParticipationDto) {
    return 'This action adds a new participation';
  }

  findAll() {
    return `This action returns all participations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} participation`;
  }

  remove(id: number) {
    return `This action removes a #${id} participation`;
  }
}
