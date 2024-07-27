import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${globalPrefix}`,
  );
}
bootstrap();
