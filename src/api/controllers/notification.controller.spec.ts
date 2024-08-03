import { NotificationService } from '@/application/services';
import { NotificationType } from '@/domain/enum';
import { createMock } from '@golevelup/nestjs-testing';
import { NotificationDto } from '../dtos/notification.dto';
import { NotificationController } from './notification.controller';

describe('NotificationController', () => {
  const notificationService = createMock<NotificationService>({
    notificate: jest.fn(),
  });
  const notificationDto: NotificationDto = {
    email: 'email@test.com',
    message: 'test message',
    notificationType: NotificationType.News,
  };
  describe('notificate', () => {
    it('should call notification service successfully', async () => {
      const notificateSpy = jest
        .spyOn(notificationService, 'notificate')
        .mockResolvedValueOnce();
      const controller = new NotificationController(notificationService);
      await controller.notificate(notificationDto);
      expect(notificateSpy).toHaveBeenCalledWith({ notificationDto });
    });
  });
});
