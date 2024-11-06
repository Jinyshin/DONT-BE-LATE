import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateRandomCode } from 'src/utils/generate-groupcode';
import { Group } from './entities/group.entity';
import { JwtService } from '@nestjs/jwt';
import { GroupMemberResponseDto } from './dto/group-member-response.dto';

@Injectable()
export class GroupsService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // 그룹 생성
  async create(createGroupDto: CreateGroupDto, userId: number): Promise<Group> {
    let participationCode = generateRandomCode(6);

    // 중복되지 않는 participationCode 생성
    while (await this.isParticipationCodeExist(participationCode)) {
      participationCode = generateRandomCode(6);
    }

    // 그룹 생성
    const group = await this.prisma.group.create({
      data: {
        name: createGroupDto.name,
        participation_code: participationCode,
      },
    });

    // GroupMember 테이블에 데이터 추가
    await this.prisma.groupMember.create({
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
    const count = await this.prisma.group.count({
      where: { participation_code: participationCode },
    });
    return count > 0;
  }

  // 토큰 확인
  async verifyTokenAndGetUserId(token: string): Promise<number> {
    try {
      const decoded = this.jwtService.verify(token.replace('Bearer ', ''));
      return decoded.userId;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // 그룹 참여
  async createGroupMember(
    groupCode: string,
    userId: number,
  ): Promise<GroupMemberResponseDto> {
    const group = await this.prisma.group.findUnique({
      where: { participation_code: groupCode, is_deleted: false },
    });

    if (!group) {
      throw new ForbiddenException('Invalid group code or group is deleted');
    }

    const groupMember = await this.prisma.groupMember.create({
      data: {
        gid: group.id,
        uid: userId,
        is_deleted: false,
      },
    });

    const updatedGroup = await this.prisma.group.update({
      where: { id: group.id },
      data: { num_participants: { increment: 1 } },
    });

    return {
      gid: groupMember.gid,
      uid: groupMember.uid,
      name: updatedGroup.name,
      num_participants: updatedGroup.num_participants,
      is_deleted: groupMember.is_deleted,
      created_at: groupMember.created_at,
      updated_at: groupMember.updated_at,
    };
  }

  // 모든 그룹 조회
  async findAll(uid: number): Promise<Group[]> {
    const groups = await this.prisma.group.findMany({
      where: {
        is_deleted: false,
        users: {
          some: { uid },
        },
      },
    });
    return groups.map((group) => new Group(group));
  }

  // 그룹 초대 링크 조회
  async getGroupInviteLink(groupId: number) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId, is_deleted: false },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const participationLink = `${process.env.CLIENT_BASE_URL}/join/${group.participation_code}`;

    return { participationLink };
  }

  async isUserIn(uid: number, gid: number) {
    return !!(await this.prisma.groupMember.findUnique({
      where: { gid_uid: { gid, uid }, is_deleted: false },
    }));
  }

  async getRanking(id: number, year: number, month: number) {
    const { rankings } = await this.prisma.group.findUnique({
      where: { id, is_deleted: false },
      select: {
        rankings: {
          where: {
            year,
            month,
          },
          orderBy: [
            { accumulated_time: 'desc' },
            { user: { nickname: 'asc' } },
          ],
          take: 20,
          select: {
            year: true,
            month: true,
            accumulated_time: true,
            user: {
              select: {
                nickname: true,
                profile_url: true,
              },
            },
          },
        },
      },
    });

    return { rankings };
  }
}
