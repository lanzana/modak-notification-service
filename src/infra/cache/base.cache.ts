import { APP_NAME } from '@/common/constants';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cluster, Redis } from 'ioredis';

@Injectable()
export class BaseCache {
  private client: Redis | Cluster;
  private baseKey: string;

  constructor(protected configService: ConfigService) {
    this.client = configService.get('redis');
  }

  public setBaseKey(baseKey: string) {
    this.baseKey = `${APP_NAME}:${baseKey}`;
  }

  public async set<T = unknown>(
    key: string,
    value: T,
    ttl?: string,
  ): Promise<void> {
    const fullKey = `${this.baseKey}:${key}`;
    const jsonValue = JSON.stringify(value);
    if (ttl) {
      await this.client.set(fullKey, jsonValue, 'EX', ttl);
    } else {
      await this.client.set(fullKey, jsonValue);
    }
  }

  public async get<T = unknown>(key: string): Promise<T | void> {
    const fullKey = `${this.baseKey}:${key}`;
    const cachedValue = await this.client.get(fullKey);
    if (cachedValue) {
      return JSON.parse(cachedValue);
    }
  }
}
