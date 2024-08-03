import { NotificationType } from '@/domain/enum';
import { NotificationAlreadySentException } from '@/domain/exceptions';
import { RecipientCache } from '@/infra/cache';
import { Logger } from '@nestjs/common';

export abstract class RecipientNotificationStrategy {
  constructor(private readonly recipientCache: RecipientCache) {}

  public abstract process(
    params: RecipientNotificationStrategy.Process.Params,
  ): Promise<RecipientNotificationStrategy.Process.Result>;

  public async checkNotificationAlreadySent(
    params: RecipientNotificationStrategy.CheckNotificationAlreadySent.Params,
  ): Promise<RecipientNotificationStrategy.CheckNotificationAlreadySent.Result> {
    const { notificationType, recipient } = params;
    const foundRecipient = await this.recipientCache.getRecipientByType(
      params.recipient,
      params.notificationType,
    );
    if (!!foundRecipient)
      throw new NotificationAlreadySentException(
        `Notification ${notificationType} already sent to ${recipient}`,
      );
  }

  public async setRecipientCache(
    params: RecipientNotificationStrategy.SetRecipientCache.Params,
  ) {
    const { notificationType, recipient, ttl } = params;
    await this.recipientCache.setRecipient(recipient, notificationType, ttl);
  }

  public async notificate(
    params: RecipientNotificationStrategy.Notificate.Params,
  ): Promise<RecipientNotificationStrategy.Notificate.Result> {
    Logger.log(`Sending message to ${params.recipient}`);
  }
}

export namespace RecipientNotificationStrategy {
  export namespace Process {
    export type Params = {
      recipient: string;
      notificationType: NotificationType;
      message: string;
    };
    export type Result = void;
  }
  export namespace CheckNotificationAlreadySent {
    export type Params = {
      recipient: string;
      notificationType: NotificationType;
    };
    export type Result = void;
  }
  export namespace Notificate {
    export type Params = {
      recipient: string;
      notificationType: NotificationType;
      message: string;
    };
    export type Result = void;
  }
  export namespace SetRecipientCache {
    export type Params = {
      recipient: string;
      notificationType: NotificationType;
      ttl: string;
    };
  }
}
