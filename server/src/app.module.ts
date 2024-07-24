import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [GroupsModule, AppointmentsModule, UsersModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
