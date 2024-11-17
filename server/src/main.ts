import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import * as admin from 'firebase-admin';

declare const module: any;
dotenv.config();

const firebaseApp = admin.initializeApp();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('그만좀늦자')
    .setDescription('The 그만좀늦자 API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // 약속 push 알림 관련 백그라운드 작업
  const ONE_HOUR = 60 * 60 * 1000;
  const THIRTY_MINUTE = 30 * 60 * 1000;
  const prismaService = app.select(PrismaModule)
                           .get(PrismaService, { strict: true });
  setInterval(async () => {
    const now = Date.now();
    const oneHourLater = new Date(now + ONE_HOUR);
    const twoHourLater = new Date(now + 2 * ONE_HOUR);

    const upcomings = await prismaService.appointment.findMany({
      select: {
        title: true,
        meet_at: true,
        users: {
          select: {
            user: {
              select: {
                fcmTokens: true
              }
            }
          }
        }
      },
      where: {
        AND: [
          { meet_at: { gt: oneHourLater } },
          { meet_at: { lte: twoHourLater } }
        ],
        is_deleted: false
      }
    });

    for (const { title, meet_at, users } of upcomings) {
      for (const { user: { fcmTokens } } of users) {
        for (const { token } of fcmTokens) {
          // just-before alert
          setTimeout(async () => {
            await firebaseApp.messaging().send({
              notification: {
                title: `약속 시간 알림!`,
                body: `${title} 약속 시간이 다 되었어요!`
              },
              token
            });
          }, meet_at.getTime() - now);

          // 30m-before alert
          setTimeout(async () => {
            await firebaseApp.messaging().send({
              notification: {
                title: `30분 전 알림`,
                body: `${title} 약속 30분 전입니다.`
              },
              token
            });
          }, meet_at.getTime() - THIRTY_MINUTE - now);

          // 1h-before alert
          setTimeout(async () => {
            await firebaseApp.messaging().send({
              notification: {
                title: `1시간 전 알림`,
                body: `${title} 약속 1시간 전입니다.`
              },
              token
            });
          }, meet_at.getTime() - ONE_HOUR - now);
        }
      }
    }
  }, ONE_HOUR);
}
bootstrap();
