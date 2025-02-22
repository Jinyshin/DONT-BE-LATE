import { Injectable } from '@nestjs/common';
import { Notification } from 'firebase-admin/lib/messaging/messaging-api';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from '../prisma/prisma.service';
import { SaveTokenDto } from './dto/save-token.dto';
import { TestNotificationsDto } from './dto/test-notificatioins.dto';

@Injectable()
export class NotificationsService {
  private alarm: NodeJS.Timeout | null = null;
  private readonly NOTIFICATION_SCHEDULES = [
    {
      timing: 'JUST_BEFORE',
      offset: 0,
      title: '약속 시간 알림!',
      bodyTemplate: (title: string) => `${title} 약속 시간이 다 되었어요!`,
    },
    {
      timing: 'THIRTY_MIN_BEFORE',
      offset: 30 * 60 * 1000,
      title: '30분 전 알림',
      bodyTemplate: (title: string) => `${title} 약속 30분 전입니다.`,
    },
    {
      timing: 'ONE_HOUR_BEFORE',
      offset: 60 * 60 * 1000,
      title: '1시간 전 알림',
      bodyTemplate: (title: string) => `${title} 약속 1시간 전입니다.`,
    },
  ];

  constructor(
    private readonly prisma: PrismaService,
    private readonly firebase: FirebaseService,
  ) {}

  async saveToken(saveTokenDto: SaveTokenDto, userId: number) {
    const existingToken = await this.prisma.fcmToken.findUnique({
      where: { token: saveTokenDto.token },
    });

    if (!existingToken) {
      return this.prisma.fcmToken.create({
        data: {
          token: saveTokenDto.token,
          uid: userId,
        },
      });
    }

    return existingToken;
  }

  enableAlarm() {
    const ONE_HOUR = 60 * 60 * 1000;
    const THIRTY_MINUTE = 30 * 60 * 1000;

    this.alarm = setInterval(async () => {
      const now = Date.now();
      const oneHourLater = new Date(now + ONE_HOUR);
      const twoHourLater = new Date(now + 2 * ONE_HOUR);

      const upcomings = await this.prisma.appointment.findMany({
        select: {
          id: true,
          title: true,
          meet_at: true,
          users: {
            select: {
              user: {
                select: {
                  fcmTokens: true,
                },
              },
            },
          },
        },
        where: {
          AND: [
            { meet_at: { gt: oneHourLater } },
            { meet_at: { lte: twoHourLater } },
          ],
          is_deleted: false,
        },
      });

      for (const { id, title, meet_at, users } of upcomings) {
        for (const {
          user: { fcmTokens },
        } of users) {
          for (const { token } of fcmTokens) {
            for (const schedule of this.NOTIFICATION_SCHEDULES) {
              setTimeout(
                async () => {
                  const noti = {
                    title: schedule.title,
                    body: schedule.bodyTemplate(title),
                  };
                  const data = { aid: id.toString() };
                  await this.sendNotification(token, noti, data);
                },
                meet_at.getTime() - schedule.offset - now,
              );
            }
          }
        }
      }
    }, ONE_HOUR);
  }

  disableAlarm() {
    if (this.alarm !== null) {
      clearInterval(this.alarm);
      this.alarm = null;
    }
  }

  async testNotifications(testNotificatioinsDto: TestNotificationsDto) {
    await this.sendNotification(
      testNotificatioinsDto.token,
      {
        title: testNotificatioinsDto.title,
        body: testNotificatioinsDto.body,
      },
      testNotificatioinsDto.data,
    );
  }

  private async sendNotification(
    token: string,
    notification: Notification,
    data: Record<string, string>,
  ) {
    try {
      await this.firebase.firebaseRef
        .messaging()
        .send({ token, notification, data });
    } catch (e) {
      console.error(`firebase push 전송 실패: ${e}`);

      switch (e.code) {
        case 'messaging/invalid-registration-token':
        case 'messaging/registration-token-not-registered':
          await this.prisma.fcmToken.delete({ where: { token } });
          break;
      }
    }
  }
}
