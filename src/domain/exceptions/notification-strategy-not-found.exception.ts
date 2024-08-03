import { DefaultException } from '@/common/exceptions/default.exception';
import { HttpStatus } from '@nestjs/common';
import { NotificationType } from '../enum';

export class NotificationStrategyNotFoundException extends DefaultException {
  constructor(notificationType: NotificationType) {
    super(
      'NOTIFICATION_STRATEGY_NOT_FOUND',
      `No strategy was found for notification type ${notificationType}`,
      HttpStatus.NOT_FOUND,
    );
  }
}
