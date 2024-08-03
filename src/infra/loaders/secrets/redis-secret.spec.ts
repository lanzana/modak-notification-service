import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { createMock } from '@golevelup/nestjs-testing';
import { RedisSecret } from './redis-secret';

const redisStringMock = 'localhost:8080';

const secretManager = createMock<SecretsManager>();

describe('Redis Secret', () => {
  it('should be defined', () => {
    const sut = new RedisSecret(secretManager);
    expect(sut).toBeDefined();
  });

  it('should be able to call load', async () => {
    secretManager.getSecretValue = jest.fn().mockResolvedValueOnce({
      SecretString: redisStringMock,
    });
    const sut = new RedisSecret(secretManager);

    await expect(sut.load()).resolves.toMatchInlineSnapshot(`undefined`);
  });
});
