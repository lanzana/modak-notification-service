import { APP_NAME } from '@/common';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const { npm_package_version: VERSION = '0.1.0' } = process.env;
export class SwaggerStartup {
  static init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setExternalDoc('Export Docs', '/swagger-json')
      .setDescription('Modak test Notification Service')
      .setVersion(VERSION)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }
}
