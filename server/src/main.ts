import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { initializeApp } from 'firebase-admin';

declare const module: any;
dotenv.config();

const firebaseApp = initializeApp();

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
  setInterval(async () => {
    const now = new Date(Date.now());
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    const prismaService = app.select(PrismaModule)
                              .get(PrismaService, { strict: true });

    const upcomings = await prismaService.appointment.findMany({
      select: {
        title: true,
        meet_at: true,
        users: {
          select: {
            user: {
              select: {
                fcm_tokens: {
                  where: {
                    expires_at: { gt: now }
                  }
                }
              }
            }
          }
        }
      },
      where: {
        AND: [
          { meet_at: { gt: now } },
          { meet_at: { lte: oneHourLater } }
        ],
        is_deleted: false
      }
    });

    for (const { title, meet_at, users } of upcomings) {
      for (const { user: { fcm_tokens } } of users) {
        for (const { token } of fcm_tokens) {
          setTimeout(() => {
            // TODO!
            // send push using firebase api
            firebaseApp.messaging().send({
              notification: {
                title: ``,
                body: ``
              },
              condition: ''
            });
          }, now.getTime() - meet_at.getTime());
        }
      }
    }
  }, 60 * 60 * 1000);
}
bootstrap();
