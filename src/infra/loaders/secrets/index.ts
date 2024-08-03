import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { ILoader } from '../loader';
import { RedisSecret } from './redis-secret';

export class Secrets implements ILoader {
  private redisSecret: RedisSecret;

  constructor(private readonly secretsManager: SecretsManager) {
    this.redisSecret = new RedisSecret(this.secretsManager);
  }

  public async load() {
    await Promise.all([
      this.redisSecret.load(),
    ]);
  }
}
