import { DefaultException } from '@/common/exceptions/default.exception';
import { HttpStatus } from '@nestjs/common';

export class NotificationAlreadySentException extends DefaultException {
  constructor(message: string) {
    super('NOTIFICATION_ALREADY_SENT', message, HttpStatus.CONFLICT);
  }
}
