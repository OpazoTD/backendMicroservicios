// apps/api-gateway/src/invoices/invoices.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InvoicesController } from './invoices.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FACTURAS_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3003 },
      },
      {
        name: 'USUARIOS_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3001 },
      },
    ]),
  ],
  controllers: [InvoicesController],
})
export class InvoicesModule {}