import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { ENV } from './ENV';
import { AppModule } from './app.module';
import { createDocument } from './app/application_module/swagger/swagger';

const appOptions: NestApplicationOptions = {
  cors: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, appOptions);
  app.enableCors();
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('/docs', app, createDocument(app));

  app.setGlobalPrefix(ENV.API_PREFIX, { exclude: ['health'] });

  await app.listen(ENV.port, () =>
    console.log(`Server is running on port ${ENV.port}`),
  );
}
bootstrap();
