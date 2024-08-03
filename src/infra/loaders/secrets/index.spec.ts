import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { createMock } from '@golevelup/nestjs-testing';
import { Secrets } from './index';
import { RedisSecret } from './redis-secret';

jest.mock('@/infra/loaders/secrets/redis-secret');

const secretManager = createMock<SecretsManager>();

describe('Secrets', () => {
  let secret: Secrets;
  let redisSecret: RedisSecret;
  beforeEach(() => {
    secret = new Secrets(secretManager);
    redisSecret = secret['redisSecret'];
  });

  it('should be defined', () => {
    expect(secret).toBeDefined();
    expect(redisSecret).toBeDefined();
  });

  it('should be able to call load', async () => {
    secretManager.getSecretValue.mockImplementationOnce(() => ({
      SecretString: '',
    }));
    await expect(secret.load()).resolves.toMatchInlineSnapshot(`undefined`);
  });
});
