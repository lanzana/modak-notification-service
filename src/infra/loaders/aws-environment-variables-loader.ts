import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { InternalServerErrorException } from '@nestjs/common';
import { environment } from '../configs/environment';
import { ILoader } from './loader';
import { Secrets } from './secrets';

export class AwsEnvironmentVariablesLoader implements ILoader {
  private secrets: Secrets;

  constructor(private readonly secretsManager: SecretsManager) {
    this.secrets = new Secrets(this.secretsManager);
  }

  public async load(): Promise<void> {
    try {
      if (!environment.isDevelopment()) {
        await this.secrets.load();
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

export default AwsEnvironmentVariablesLoader;
