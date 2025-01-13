import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: +process.env.JWT_MAX_AGE },
    }),
  ],
})
export class AppointmentsModule {}
