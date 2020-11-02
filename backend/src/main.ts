import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookiParser from 'cookie-parser';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
