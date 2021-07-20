import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('Minecraft')
    .addTag('Volume')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${methodKey} ${controllerKey.replace('Controller', '')}`,
  };
  const document = SwaggerModule.createDocument(app, config, options);

  const redocOptions: RedocOptions = {
    title: '1 Pod Nat',
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    tagGroups: [
      {
        name: 'Core resources',
        tags: ['Minecraft', 'Volume'],
      },
    ],
    redocVersion: 'v2.0.0-rc.54',
  };
  // Instead of using SwaggerModule.setup() you call this module
  await RedocModule.setup('/api', app, document, redocOptions);

  await app.listen(3000);
}
bootstrap();
