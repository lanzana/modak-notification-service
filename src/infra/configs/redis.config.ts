import { Logger } from '@nestjs/common';
import redis from 'ioredis';
import { IConfig } from './config';
import { environment } from './environment';
export class RedisConfig implements IConfig {
  public readonly name: string = 'redis';
  private readonly logger = new Logger(RedisConfig.name);
  public get() {
    const host = process.env.REDIS_CONNECTION_HOST;
    const port = +(process.env.REDIS_CONNECTION_PORT || 6379);
    if (environment.isDevelopment()) {
      this.logger.log(`Using single Redis at ${host}:${port}`);
      return new redis({
        host: host,
        port: port,
        enableReadyCheck: false,
        maxRetriesPerRequest: null,
      });
    }
    this.logger.log(`Using cluster Redis at ${host}:${port}`);
    return new redis.Cluster(
      [
        {
          host: host,
          port: port,
        },
      ],
      {
        enableReadyCheck: false,
      },
    );
  }
}
