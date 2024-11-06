import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SaveTokenDto } from './dto/save-token.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async saveToken(saveTokenDto: SaveTokenDto, userId: number) {
    const existingToken = await this.prisma.fcmToken.findUnique({
      where: { token: saveTokenDto.token },
    });

    if (!existingToken) {
      return this.prisma.fcmToken.create({
        data: {
          token: saveTokenDto.token,
          uid: userId,
        },
      });
    }

    return existingToken;
  }
}
