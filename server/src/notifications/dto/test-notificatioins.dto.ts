import { IsString, IsNotEmpty, isNotEmpty } from 'class-validator';
import { Notification } from 'firebase-admin/lib/messaging/messaging-api';

export class TestNotificationsDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  data: Record<string, string>;
}
