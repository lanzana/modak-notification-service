import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import AwsEnvironmentVariablesLoader from './infra/loaders/aws-environment-variables-loader';
import { SwaggerStartup } from './infra/startup';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const secretsManager = new SecretsManager({});
  const awsEnvironmentVariablesLoader = new AwsEnvironmentVariablesLoader(
    secretsManager,
  );
  await awsEnvironmentVariablesLoader.load();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const configService = app.get<ConfigService>(ConfigService);


  const port = configService.get('APP_PORT');
  
  SwaggerStartup.init(app);
  await app.listen(Number(port));
}
bootstrap();
