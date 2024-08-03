import { NotificationDto } from '@/api/dtos/notification.dto';
import { Injectable } from '@nestjs/common';
import { RecipientNotificationContext } from '../use-cases/strategies';

@Injectable()
export class NotificationService {
  constructor(
    private readonly recipienctContext: RecipientNotificationContext,
  ) {}
  public async notificate(params: NotificationService.Notificate.Params) {
    const { email, message, notificationType } = params.notificationDto;
    const strategy = this.recipienctContext.getStrategy(notificationType);

    await strategy.process({ message, notificationType, recipient: email });
  }
}

export namespace NotificationService {
  export namespace Notificate {
    export type Params = {
      notificationDto: NotificationDto;
    };
  }
}
