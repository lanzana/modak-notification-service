import { NotificationType } from '@/domain/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class NotificationDto {
  @ApiProperty({
    description: 'Random name',
    example: NotificationType.News,
  })
  @IsEnum(NotificationType)
  notificationType: NotificationType;

  @ApiProperty({
    description: 'Random email',
    example: 'foo@bar.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Message to be sent',
    example: 'Example message',
  })
  @IsString()
  message: string;
}
