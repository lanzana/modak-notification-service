import { NotificationService } from '@/application/services';
import { Body, Controller, Post } from '@nestjs/common';
import { NotificationDto } from '../dtos/notification.dto';

@Controller('/notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post('/notificate')
  async notificate(@Body() notificationDto: NotificationDto): Promise<void> {
    await this.notificationService.notificate({ notificationDto });
  }
}
