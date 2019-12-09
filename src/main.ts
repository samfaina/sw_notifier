import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PushModule } from './push.module';

// create logger instance
const logger = new Logger('Pusher Main');

// create microservice options
const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 8877,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    PushModule,
    microserviceOptions,
  );
  await app.listen(() => logger.log('Pusher microservice is listening...'));
}
bootstrap();
