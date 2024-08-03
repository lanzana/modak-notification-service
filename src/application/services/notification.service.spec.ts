import { NotificationDto } from '@/api/dtos/notification.dto';
import { NotificationType } from '@/domain/enum';
import { createMock } from '@golevelup/nestjs-testing';
import { RecipientNotificationContext } from '../use-cases/strategies';
import { RecipientNotificationStrategy } from '../use-cases/strategies/recipient-notification.strategy';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  describe('notificate', () => {
    const contextMock = createMock<RecipientNotificationContext>({
      getStrategy: jest.fn(),
    });
    const strategyMock = createMock<RecipientNotificationStrategy>({
      process: jest.fn().mockResolvedValueOnce(undefined),
    });
    const notificationDto: NotificationDto = {
      email: 'email@test.com',
      message: 'test message',
      notificationType: NotificationType.News,
    };
    it('should call strategy successfully', async () => {
      const contextSpy = jest
        .spyOn(contextMock, 'getStrategy')
        .mockReturnValueOnce(strategyMock);
      const strategySpy = jest
        .spyOn(strategyMock, 'process')
        .mockResolvedValueOnce();
      const notificationService = new NotificationService(contextMock);
      await notificationService.notificate({ notificationDto });
      expect(contextSpy).toHaveBeenCalledWith(notificationDto.notificationType);
      expect(strategySpy).toHaveBeenCalledTimes(1);
    });
  });
});
