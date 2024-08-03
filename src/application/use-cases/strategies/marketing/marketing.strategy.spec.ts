import { NotificationType } from '@/domain/enum';
import { RecipientCache } from '@/infra/cache';
import { createMock } from '@golevelup/nestjs-testing';
import { MarketingStrategy } from './marketing.strategy';

describe('MarketingStrategy', () => {
  const recipientCacheMock = createMock<RecipientCache>();
  const params = {
    message: '',
    notificationType: NotificationType.Marketing,
    recipient: 'test@test.com',
  };
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  it('should process successfully', async () => {
    jest
      .spyOn(recipientCacheMock, 'getRecipientByType')
      .mockResolvedValueOnce(undefined);
    jest.spyOn(recipientCacheMock, 'setRecipient').mockResolvedValueOnce();
    const strategy = new MarketingStrategy(recipientCacheMock);
    await strategy.process(params);
  });
});
