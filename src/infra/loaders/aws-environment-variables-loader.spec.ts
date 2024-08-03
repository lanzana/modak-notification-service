import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { createMock } from '@golevelup/nestjs-testing';
import { InternalServerErrorException } from '@nestjs/common';
import { AwsEnvironmentVariablesLoader } from './aws-environment-variables-loader';

const mockSecretsManager = createMock<SecretsManager>();

describe('AwsEnvironmentVariablesLoader', () => {
  it('should be defined', () => {
    const sut = new AwsEnvironmentVariablesLoader(mockSecretsManager,);
    expect(sut).toBeDefined();
  });

  it('should be able to call load', async () => {
    const sut = new AwsEnvironmentVariablesLoader(mockSecretsManager,);
    jest.spyOn(sut, 'load').mockResolvedValueOnce(undefined);
    await expect(sut.load()).resolves.toBeUndefined();
  });
  it('should throw error when call load', async () => {
    const sut = new AwsEnvironmentVariablesLoader(mockSecretsManager);
    jest
      .spyOn(sut, 'load')
      .mockRejectedValueOnce(new InternalServerErrorException('error'));
    await expect(sut.load()).rejects.toThrowError();
  });
});
