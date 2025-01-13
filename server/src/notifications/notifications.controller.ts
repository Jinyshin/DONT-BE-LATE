import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { authorize } from 'src/utils/jwt-auth';
import { SaveTokenDto } from './dto/save-token.dto';
import { TestNotificationsDto } from './dto/test-notificatioins.dto';
import { NotificationsService } from './notifications.service';

@Controller('api/v1/notifications')
@ApiTags('Notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'FCM 토큰 저장' })
  @ApiResponse({ status: 201, description: '토큰 저장 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiResponse({ status: 500, description: '서버 오류' })
  @Post('save-token')
  async saveToken(
    @Body() saveTokenDto: SaveTokenDto,
    @Headers('Authorization') authorization?: string,
  ): Promise<void> {
    const { id: userId } = await authorize(this.jwtService, authorization);
    if (!userId) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    // 추출한 userId를 통해 토큰 저장
    try {
      await this.notificationsService.saveToken(saveTokenDto, userId);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('유효하지 않은 데이터 형식입니다.');
      }
      throw new InternalServerErrorException(
        '토큰 저장 중 오류가 발생했습니다.',
      );
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '테스트용 firebase push 전송' })
  @ApiResponse({ status: 201, description: 'firebase push 전송 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiResponse({ status: 500, description: '서버 오류' })
  @Post('test-notifications')
  async testNotifications(
    @Body() testNotificatioinsDto: TestNotificationsDto,
  ): Promise<void> {
    // 추출한 userId를 통해 토큰 저장
    try {
      await this.notificationsService.testNotifications(testNotificatioinsDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('유효하지 않은 데이터 형식입니다.');
      }
      throw new InternalServerErrorException(
        '테스트 알림 전송 중 오류가 발생했습니다.',
      );
    }
  }

}
