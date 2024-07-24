import { BadRequestException, Body, Controller, HttpException, InternalServerErrorException, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';


@Controller('api/v1/accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Post("signin")
  async signin(
    @Body('email') email?: string,
    @Body('password') password?: string
  ) {
    if (!email || !password) {
      throw new BadRequestException();
    }

    return await this.accountService.authorizeByEmailPassword(email, password);
  }

  @Post("signup")
  async signup(
    @Body('email') email?: string,
    @Body('nickname') nickname?: string,
    @Body('password') password?: string,
    @Body('profileUrl') profileUrl?: string,
  ) {
    if (!email || !nickname || !password) {
      throw new BadRequestException();
    }

    const createdId = await this.accountService.register(email, nickname, password, profileUrl ?? "");

    if (createdId === null) {
      throw new InternalServerErrorException();
    }

    return { id: createdId };
  }

  @Post('kakao/signin')
  async kakaoSignin(@Body('code') code?: string) {
    if (!code) {
      throw new BadRequestException();
    }

    return await this.accountService.authorizeByKakaoOAuth(code);

  //   try {
  //     return await this.accountService.authorizeByKakaoOAuth(code);
  //   } catch(e) {
  //     if (e instanceof HttpException) {
  //       throw e;
  //     } else {
  //       console.error(e);
  //       throw new BadRequestException();
  //     }
  //   }
  }
}
