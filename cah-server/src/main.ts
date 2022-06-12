import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import getConf from './conf/Conf';
import databaseConnect from './database/DatabaseConnection';

async function bootstrap() {
  const conf = getConf();

  // Init

  await databaseConnect();

  // End init

  const app = await NestFactory.create(AppModule);
  await app.listen(parseInt(conf.port));
}
bootstrap();
