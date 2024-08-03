import { NotificationType } from '@/domain/enum';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseCache } from './base.cache';

@Injectable()
export class RecipientCache extends BaseCache implements OnModuleInit {
  onModuleInit() {
    this.setBaseKey('RecipientCache');
  }

  public async setRecipient(
    recipient: string,
    notificationType: NotificationType,
    ttl: string,
  ): Promise<void> {
    await this.set(
      `${recipient}:${notificationType}`,
      `Notification sent at ${new Date().toISOString()}`,
      ttl,
    );
  }

  public async getRecipientByType(
    recipient: string,
    notificationType: NotificationType,
  ) {
    return this.get(`${recipient}:${notificationType}`);
  }
}
