import { BadRequestException, Body, Controller, HttpException, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Post('kakao/signin')
  async kakaoSignin(@Body('code') code?: string) {
    if (!code) {
      throw new BadRequestException();
    }

    try {
      return await this.accountService.authorizeByKakaoOAuth(code);
    } catch(e) {
      if (e instanceof HttpException) {
        throw e;
      } else {
        console.error(e);
        throw new BadRequestException();
      }
    }
  }
}
