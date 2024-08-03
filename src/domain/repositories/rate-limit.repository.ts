import { NotificationType } from '../enum';

export interface IRateLimitRepository {
  save(
    params: IRateLimitRepository.Save.Params,
  ): Promise<IRateLimitRepository.Save.Result>;
}

export const IRateLimitRepository = Symbol('IRateLimitRepository');

export namespace IRateLimitRepository {
  export namespace Save {
    export type Params = {
      recipient: string;
      notificationType: NotificationType;
    };
    export type Result = void;
  }
}
