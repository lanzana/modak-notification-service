import { ILoader } from '../loader';
import { AwsSecretsManager } from './aws-secrets-manager';

export class RedisSecret extends AwsSecretsManager implements ILoader {
  private secretName = 'ConnectionStrings__RedisCluster';
  public readonly name: string = 'redis';

  async load(): Promise<void> {
    const secretString = await this.getSecretValue(this.secretName);
    process.env.REDIS_CONNECTION_STRING = secretString;
  }
}
