import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength
} from 'class-validator';

export class EmailDto{
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class SigninDto {
  @ApiProperty({
    description: '사용자의 이메일 주소',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: '사용자의 비밀번호',
    example: 'securepassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignupDto {
  @ApiProperty({
    description: '사용자의 이메일 주소',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '사용자의 닉네임', example: 'JohnDoe' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  nickname: string;

  @ApiProperty({
    description: '사용자의 비밀번호',
    example: 'securepassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    description: '프로필 URL (선택 사항)',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsUrl({}, { message: '올바른 URL 형식이 아닙니다' })
  profileUrl: string = '';
}

export class KakaoSigninDto {
  @ApiProperty({ description: '카카오 인증 코드', example: 'kakao-auth-code' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
