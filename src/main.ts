import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  app.use(
    '/api/v1/docs',
    express.static(path.join(__dirname, 'swagger-static')),
  );

  const config = new DocumentBuilder()
    .setTitle('Weather API')
    .setVersion('3.0')
    .addServer(`${process.env.API_URL_SWAGGER || 'http://localhost:3000'}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document, {
    customSiteTitle: 'Weather API doc',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/', (req, res) => {
    res.redirect(`/${globalPrefix}`);
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${globalPrefix}`,
  );
}
bootstrap();
