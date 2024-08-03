import { RecipientCache } from '@/infra/cache';
import { Injectable } from '@nestjs/common';
import { RecipientNotificationStrategy } from '../recipient-notification.strategy';

@Injectable()
export class MarketingStrategy extends RecipientNotificationStrategy {
  constructor(recipientCache: RecipientCache) {
    super(recipientCache);
  }
  public async process(
    params: RecipientNotificationStrategy.Process.Params,
  ): Promise<RecipientNotificationStrategy.Process.Result> {
    const { notificationType, recipient } = params;
    await this.checkNotificationAlreadySent({
      notificationType,
      recipient,
    });
    await this.setRecipientCache({ notificationType, recipient, ttl: '10800' });
    await this.notificate(params);
  }
}
