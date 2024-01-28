/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 

  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));


  app.use(express.static('frontend'));
  await app.listen(9100);
}
bootstrap();
