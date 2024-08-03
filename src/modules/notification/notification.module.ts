import { NotificationController } from '@/api/controllers';
import { RecipientCache } from '@/infra/cache';
import { Config } from '@/infra/configs/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { services } from './providers/services';
import { strategies } from './providers/strategies';

@Module({
  controllers: [NotificationController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: new Config().get(),
    }),
  ],
  providers: [RecipientCache, ...services, ...strategies],
})
export class NotificationModule {}
