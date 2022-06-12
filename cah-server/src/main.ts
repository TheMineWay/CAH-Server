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

  app.enableCors({
    origin: '*',
    optionsSuccessStatus: 200,
    methods: [
      'GET',
      'POST',
      'DELETE',
      'PUT',
      'OPTIONS',
      'HEAD',
    ],
  });
  await app.listen(parseInt(conf.port));
}
bootstrap();
