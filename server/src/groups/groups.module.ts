import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppointmentsService } from '../appointments/appointments.service';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, AppointmentsService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: parseInt(process.env.JWT_MAX_AGE!) },
    }),
  ],
})
export class GroupsModule {}
