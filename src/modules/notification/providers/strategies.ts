import {
    MarketingStrategy,
    NewsStrategy,
    StatusStrategy,
} from '@/application/use-cases/strategies';
import { RecipientNotificationContext } from '@/application/use-cases/strategies/context/recipient-notification.context';
import { Provider } from '@nestjs/common';

export const strategies: Array<Provider> = [
  RecipientNotificationContext,
  MarketingStrategy,
  NewsStrategy,
  StatusStrategy,
];
