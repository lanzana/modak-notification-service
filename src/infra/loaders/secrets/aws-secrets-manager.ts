import { SecretsManager } from '@aws-sdk/client-secrets-manager';

export class AwsSecretsManager {
  constructor(private readonly secretsManager: SecretsManager) {}

  public async getSecretValue(secretId: string): Promise<string> {
    const { SecretString } = await this.secretsManager.getSecretValue({
      SecretId: secretId,
    });

    if (!SecretString) {
      throw new Error(`Secret ${secretId} does not found`);
    }
    return SecretString;
  }
}
