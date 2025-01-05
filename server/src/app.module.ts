import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { FirebaseModule } from './firebase/firebase.module';
import { GroupsModule } from './groups/groups.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [GroupsModule, AppointmentsModule, UsersModule, AccountsModule, PrismaModule, NotificationsModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
