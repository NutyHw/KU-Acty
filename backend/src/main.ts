import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookiParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookiParser());
  await app.listen(3000);
}
bootstrap();
