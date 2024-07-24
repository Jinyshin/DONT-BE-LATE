import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
// import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     secret: config.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: parseInt(process.env.JWT_MAX_AGE) },
    //   }),
    // })
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: parseInt(process.env.JWT_MAX_AGE) },
    }),
    PrismaModule
  ],
  providers: [AccountsService],
  controllers: [AccountsController]
})
export class AccountsModule {}
