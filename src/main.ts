// // main.ts

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Transport } from '@nestjs/microservices';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice(AppModule, {
//     transport: Transport.NATS,
//     options: {
//       url: 'nats://localhost:4222', // Replace with your NATS server URL
//     },
//   });
//   await app.listen();
// }
// bootstrap();
// main.ts

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import {
  ThrottlerGuard,
  ThrottlerModuleOptions,
  ThrottlerStorage,
} from '@nestjs/throttler';

async function bootstrap() {
  // Create the HTTP server
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // const reflector = app.get(Reflector);
  // const options = app.get<ThrottlerModuleOptions>('ThrottlerModuleOptions');
  // const storage = app.get<ThrottlerStorage>('ThrottlerStorage');

  // const throttlerGuard = new ThrottlerGuard(options, storage, reflector);

  // app.useGlobalGuards(throttlerGuard);
  // Set the HTTP server to listen on a specific port (default is 3000)
  const httpPort = process.env.PORT || 3000;
  await app.listen(httpPort);
  console.log(`HTTP server is running on port ${httpPort}`);

  // Create the NATS microservice
  // const microservice = app.connectMicroservice({
  //   transport: Transport.NATS,
  //   options: {
  //     url: 'nats://localhost:4222', // Replace with your NATS server URL
  //   },
  // });

  // Start the microservice
  await app.startAllMicroservices();
  console.log('NATS microservice is running');
}

bootstrap();
