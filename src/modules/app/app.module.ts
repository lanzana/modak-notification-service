import { Config } from '@/infra/configs/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: new Config().get(),
    }),
    TerminusModule,
    NotificationModule,
  ],
})
export class AppModule {}
