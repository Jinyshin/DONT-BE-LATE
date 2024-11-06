import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SaveTokenDto } from './dto/save-token.dto';
import { JwtService } from '@nestjs/jwt';
import { authorize } from 'src/utils/jwt-auth';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('save-token')
  async saveToken(
    @Body() saveTokenDto: SaveTokenDto,
    @Headers('Authorization') authorization?: string,
  ): Promise<void> {
    const { id: userId } = await authorize(this.jwtService, authorization);
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }

    // 추출한 userId를 통해 토큰 저장
    await this.notificationsService.saveToken(saveTokenDto, userId);
  }
}
