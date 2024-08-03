import { NotificationType } from '@/domain/enum';
import { NotificationStrategyNotFoundException } from '@/domain/exceptions';
import { createMock } from '@golevelup/nestjs-testing';
import { MarketingStrategy } from '../marketing/marketing.strategy';
import { NewsStrategy } from '../news/news.strategy';
import { StatusStrategy } from '../status/status.strategy';
import { RecipientNotificationContext } from './recipient-notification.context';

describe('RecipientNotificationContext', () => {
  const newsStrategyMock = createMock<NewsStrategy>();
  const statusStrategyMock = createMock<StatusStrategy>();
  const marketingStrategyMock = createMock<MarketingStrategy>();
  it('should throw ProposalConsolidatedAccrualStrategyException when strategy not found', () => {
    const context = new RecipientNotificationContext(
      newsStrategyMock,
      marketingStrategyMock,
      statusStrategyMock,
    );
    try {
      context['getStrategy']('' as NotificationType);
    } catch (error) {
      expect(error).toBeInstanceOf(NotificationStrategyNotFoundException);
    }
  });
});
