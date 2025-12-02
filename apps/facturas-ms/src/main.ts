import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FacturasMsModule } from './facturas-ms.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FacturasMsModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3003,
      },
    },
  );

  await app.listen();
  console.log('Facturas MS corriendo en TCP://127.0.0.1:3003');
}
bootstrap();
