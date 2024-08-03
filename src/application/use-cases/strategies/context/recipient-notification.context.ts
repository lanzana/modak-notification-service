import { NotificationType } from '@/domain/enum';
import { NotificationStrategyNotFoundException } from '@/domain/exceptions';
import { Injectable } from '@nestjs/common';
import { MarketingStrategy } from '../marketing/marketing.strategy';
import { NewsStrategy } from '../news/news.strategy';
import { RecipientNotificationStrategy } from '../recipient-notification.strategy';
import { StatusStrategy } from '../status/status.strategy';

@Injectable()
export class RecipientNotificationContext {
  private readonly notificationStrategy = new Map<
    NotificationType,
    RecipientNotificationStrategy
  >();

  constructor(
    private readonly newsStrategy: NewsStrategy,
    private readonly marketingStrategy: MarketingStrategy,
    private readonly statusStrategy: StatusStrategy,
  ) {
    this.notificationStrategy.set(NotificationType.News, this.newsStrategy);
    this.notificationStrategy.set(NotificationType.Status, this.statusStrategy);
    this.notificationStrategy.set(
      NotificationType.Marketing,
      this.marketingStrategy,
    );
  }

  getStrategy(
    notificationType: NotificationType,
  ): RecipientNotificationStrategy {
    const strategy = this.notificationStrategy.get(notificationType);
    if (!strategy) {
      throw new NotificationStrategyNotFoundException(notificationType);
    }
    return strategy;
  }
}
