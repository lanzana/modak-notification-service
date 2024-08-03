import { NotificationType } from '@/domain/enum';
import { NotificationAlreadySentException } from '@/domain/exceptions';
import { RecipientCache } from '@/infra/cache';
import { createMock } from '@golevelup/nestjs-testing';
import { Logger } from '@nestjs/common';
import { NewsStrategy } from './news/news.strategy';

describe('RecipientNotificationStrategy', () => {
  const recipientCacheMock = createMock<RecipientCache>();
  const strategy = new NewsStrategy(recipientCacheMock);
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  const recipient = 'test@test.com';
  const notificationType = NotificationType.News;
  describe('checkNotificationAlreadySent', () => {
    it('should throw NotificationAlreadySentException if exists', async () => {
      jest
        .spyOn(recipientCacheMock, 'getRecipientByType')
        .mockResolvedValueOnce('test');
      await expect(
        strategy['checkNotificationAlreadySent']({
          notificationType,
          recipient,
        }),
      ).rejects.toThrow(NotificationAlreadySentException);
    });
  });

  describe('setRecipientCache', () => {
    it('should set recipient successfully', async () => {
      const setRecipientSpy = jest
        .spyOn(recipientCacheMock, 'setRecipient')
        .mockResolvedValueOnce();
      const ttl = '';
      await strategy.setRecipientCache({
        notificationType,
        recipient,
        ttl,
      });
      expect(setRecipientSpy).toHaveBeenCalledWith(
        recipient,
        notificationType,
        ttl,
      );
    });
  });

  describe('notificate', () => {
    it('should notificate', async () => {
      const loggerSpy = jest.spyOn(Logger, 'log');
      const message = 'test';
      await strategy.notificate({ notificationType, message, recipient });
      expect(loggerSpy).toHaveBeenCalledWith(`Sending message to ${recipient}`);
    });
  });
});
