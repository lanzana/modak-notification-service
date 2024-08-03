import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { createMock } from '@golevelup/nestjs-testing';
import { AwsSecretsManager } from './aws-secrets-manager';

const secretManager = createMock<SecretsManager>();
const secretValueMock = 'fake-secret-value';

describe('AWSScretsManager', () => {
  it('should be defined', () => {
    const sut = new AwsSecretsManager(secretManager);
    expect(sut).toBeDefined();
  });

  it('should get secret value', async () => {
    const getSecretValueSpy = jest
      .spyOn(secretManager, 'getSecretValue')
      .mockImplementationOnce(() => {
        return {
          SecretString: secretValueMock,
        };
      });

    const sut = new AwsSecretsManager(secretManager);
    const secret = 'some-secret-id';
    const result = await sut.getSecretValue(secret);
    expect(result).toBe('fake-secret-value');
    expect(getSecretValueSpy).toBeCalledTimes(1);
    expect(getSecretValueSpy).toBeCalledWith({ SecretId: secret });
  });

  it('should throw error when secret not found', async () => {
    const getSecretValueSpy = jest
      .spyOn(secretManager, 'getSecretValue')
      .mockImplementationOnce(() => {
        return {
          SecretString: undefined,
        };
      });

    const sut = new AwsSecretsManager(secretManager);
    const secret = 'some-secret-id';
    await expect(sut.getSecretValue(secret)).rejects.toThrowError(
      `Secret ${secret} does not found`,
    );
    expect(getSecretValueSpy).toBeCalledTimes(1);
    expect(getSecretValueSpy).toBeCalledWith({ SecretId: secret });
  });
});
