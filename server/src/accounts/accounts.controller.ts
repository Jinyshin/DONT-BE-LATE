import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KakaoSigninDto, SigninDto, SignupDto } from './accounts.dto';

@ApiTags('Accounts')
@Controller('api/v1/accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Post('signin')
  @ApiOperation({ summary: '이메일과 비밀번호로 로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 400, description: '잘못된 입력 데이터' })
  async signin(@Body() signinDto: SigninDto) {
    return await this.accountService.authorizeByEmailPassword(
      signinDto.email,
      signinDto.password,
    );
  }

  @Post('signup')
  @ApiOperation({ summary: '새로운 사용자 회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: '잘못된 입력 데이터' })
  async signup(@Body() signupDto: SignupDto) {
    const createdId = await this.accountService.register(
      signupDto.email,
      signupDto.nickname,
      signupDto.password,
      signupDto.profileUrl ?? '',
    );

    if (createdId === null) {
      throw new InternalServerErrorException();
    }

    return { id: createdId };
  }

  @Post('kakao/signin')
  @ApiOperation({ summary: '카카오 OAuth로 로그인' })
  @ApiResponse({ status: 200, description: '카카오 로그인 성공' })
  @ApiResponse({ status: 400, description: '잘못된 입력 데이터' })
  async kakaoSignin(@Body() kakaoSigninDto: KakaoSigninDto) {
    try {
      return await this.accountService.authorizeByKakaoOAuth(
        kakaoSigninDto.code,
      );
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      } else {
        console.error(e);
        throw new BadRequestException();
      }
    }
  }
}
