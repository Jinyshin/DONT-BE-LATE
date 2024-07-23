import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateRandomCode } from 'src/utils/generate-groupcode';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto, userId: number): Promise<Group> {
    let participationCode = generateRandomCode(6);

    // 중복되지 않는 participationCode 생성
    while (await this.isParticipationCodeExist(participationCode)) {
      participationCode = generateRandomCode(6);
    }

    // 그룹 생성
    const group = await this.prisma.groups.create({
      data: {
        name: createGroupDto.name,
        participation_code: participationCode,
      },
    });

    // GroupMember 테이블에 데이터 추가
    await this.prisma.groupMembers.create({
      data: {
        gid: group.id,
        uid: userId,
        is_deleted: false,
      },
    });

    return new Group(group);
  }

  // participationCode의 중복 여부 확인
  private async isParticipationCodeExist(
    participationCode: string,
  ): Promise<boolean> {
    const count = await this.prisma.groups.count({
      where: { participation_code: participationCode },
    });
    return count > 0;
  }

  // 모든 그룹 조회
  async findAll(): Promise<Group[]> {
    const groups = await this.prisma.groups.findMany({
      where: { is_deleted: false },
    });
    return groups.map((group) => new Group(group));
  }

  // 특정 ID를 가진 그룹 조회
  async findOne(id: number): Promise<Group> {
    const group = await this.prisma.groups.findUnique({
      where: { id },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return new Group(group);
  }
}