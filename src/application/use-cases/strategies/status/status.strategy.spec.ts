import { NotificationType } from '@/domain/enum';
import { RecipientCache } from '@/infra/cache';
import { createMock } from '@golevelup/nestjs-testing';
import { StatusStrategy } from './status.strategy';

describe('StatusStrategy', () => {
  const recipientCacheMock = createMock<RecipientCache>();
  const params = {
    message: '',
    notificationType: NotificationType.Status,
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
    const strategy = new StatusStrategy(recipientCacheMock);
    await strategy.process(params);
  });
});
