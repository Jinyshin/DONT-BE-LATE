import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentsService } from './appointments/appointments.service';

declare const module: any;
dotenv.config();

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
    const appointmentService = app.select(AppointmentsModule)
                                  .get(AppointmentsService, { strict: true });
    const upcomings = await appointmentService.listUpcomings();

    for (const appointment of upcomings) {
      const now = Date.now();
      const { title, meet_at, users } = appointment;

      setTimeout(() => {
        // TODO!
        // send noti
      }, meet_at.getTime() - now);
    }
  }, 60 * 60 * 1000);
}
bootstrap();
