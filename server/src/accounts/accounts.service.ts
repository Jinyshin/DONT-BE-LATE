import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type KakaoIdToken = {
  aud: string,
  sub: string,
  auth_time: number,
  iss: string,
  nickname: string,
  exp: number,
  iat: number,
  picture: string,
  email: string
}

@Injectable()
export class AccountsService {
  constructor(private readonly httpService: HttpService, private readonly jwtService: JwtService) {}

  async authorizeByKakaoOAuth(code: string) {
    const url = 'https://kauth.kakao.com/oauth/token';
    const res = await this.httpService.axiosRef.get(
      url,
      {
        params: {
          code,
          'client_id': process.env.KAKAOAPIS_CLIENT_ID,
          'grant_type': 'authorization_code',
          'redirect_uri': process.env.KAKAOAPIS_OAUTH_REDIRECT_URI
        }
      }
    );
    const {
      payload: { email, picture, nickname }
    } = this.parseJWT<any, KakaoIdToken>(res.data['id_token']);

    // user confirming logic is required

    const payload = { email, picture, nickname };
    const token = await this.jwtService.signAsync(payload);

    throw new NotFoundException(payload);

    return { accessToken: token };
  }

  private parseJWT<H, P>(jwt: string) {
    const [ encodedHeader, encodedPayload ] = jwt.split('.');
    const headerText = Buffer.from(encodedHeader, 'base64').toString();
    const payloadText = Buffer.from(encodedPayload, 'base64').toString();
    const header = JSON.parse(headerText);
    const payload = JSON.parse(payloadText);

    return { header, payload } as { header: H, payload: P };
  }
}
