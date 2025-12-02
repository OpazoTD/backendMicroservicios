import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductosMsModule } from './productos-ms.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv'; 

dotenv.config();
const logger = new Logger('ProductsMicroservice'); 
async function bootstrap() {
  const port = parseInt(process.env.MS_PRODUCTS_PORT ?? '3002', 10); 
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductosMsModule,
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
  logger.log(`Microservicio de Productos corriendo en: tcp://0.0.0.0:${port}`);
  logger.log(`No typescript errors found.`);
}
bootstrap();