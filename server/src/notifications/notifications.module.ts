import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: parseInt(process.env.JWT_MAX_AGE!) },
    }),
    FirebaseModule,
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
