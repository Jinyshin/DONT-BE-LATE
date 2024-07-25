import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { sha256 } from 'src/utils/hash';

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
};

export type TokenPayload = {
  id: number,
  email: string,
  nickname: string,
  profile_url: string,
};

@Injectable()
export class AccountsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(
    email: string,
    nickname: string,
    password: string,
    profileUrl: string
  ) {
    try {
      const { id } = await this.prisma.users.create({
        data: {
          email,
          nickname,
          password: this.hashPassword(password),
          profile_url: profileUrl,
        }
      });

      return id;
    } catch(e) {
      // if (e instanceof PrismaClientKnownRequestError) {}
      console.error(e);
      return null;
    }
  }

  async authorizeByEmailPassword(email: string, password: string) {
    const hashed = this.hashPassword(password);

    const user = await this.prisma.users.findUnique({
      where: { email, password: hashed },
      select: {
        id: true,
        email: true,
        nickname: true,
        profile_url: true,
      },
    });

    if (user === null) {
      throw new NotFoundException();
    }

    return { accessToken: await this.issueToken(user) };
  }

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
      payload: { email, nickname, picture: profile_url }
    } = this.parseJWT<any, KakaoIdToken>(res.data['id_token']);

    const user = await this.prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        nickname: true,
        profile_url: true,
      },
    });

    if (user === null) {
      console.log(profile_url);
      throw new NotFoundException({ email, nickname, profile_url });
    }

    return { accessToken: await this.issueToken(user) };
  }

  private parseJWT<H, P>(jwt: string) {
    const [ encodedHeader, encodedPayload ] = jwt.split('.');
    const headerText = Buffer.from(encodedHeader, 'base64').toString();
    const payloadText = Buffer.from(encodedPayload, 'base64').toString();
    const header = JSON.parse(headerText);
    const payload = JSON.parse(payloadText);

    return { header, payload } as { header: H, payload: P };
  }

  private async issueToken(user: TokenPayload) {
    const { id, email, nickname, profile_url, } = user;
    const payload = { id, email, nickname, profile_url };

    return await this.jwtService.signAsync(payload);
  }

  private hashPassword(password: string) {
    const salt = process.env.ENC_PASSWORD_SALT;
    const salted = `${salt}-${password}`;

    return sha256(salted);
  }
}
