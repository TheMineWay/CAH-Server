import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import databaseConnect from './database/DatabaseConnection';

async function bootstrap() {
  // Init

  await databaseConnect();

  // End init

  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
