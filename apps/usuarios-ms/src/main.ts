import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsuariosMsModule } from './usuarios-ms.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();
const logger = new Logger('UsersMicroservice');

async function bootstrap() {
  const port = parseInt(process.env.MS_USERS_PORT ?? '3001', 10);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsuariosMsModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: port,
      },
    },
  );

  await app.listen();
  logger.log(`[Nest] ${process.pid}  - ${new Date().toLocaleString('es-CL')}     LOG [NestMicroservice] Nest microservice successfully started +1ms`);
  logger.log(`Microservicio de Usuarios corriendo en: tcp://0.0.0.0:${port}`);
  logger.log(`No typescript errors found.`);
}
bootstrap();
