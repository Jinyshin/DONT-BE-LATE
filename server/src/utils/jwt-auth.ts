import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/accounts/accounts.service';


export async function authorize(jwtService: JwtService, authorization?: string) {
  const tokenPrefix = 'Bearer ';

  if (!authorization || !authorization.startsWith(tokenPrefix)) {
    throw new UnauthorizedException();
  }

  try {
    const token = authorization.substring(tokenPrefix.length);
    const { id } = await jwtService.verifyAsync<TokenPayload>(token);

    return { id };
  } catch(e) {
    throw new ForbiddenException();
  }
}