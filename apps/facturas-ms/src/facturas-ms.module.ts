import { Module } from '@nestjs/common';
import { FacturasMsController } from './facturas-ms.controller';
import { FacturasMsService } from './facturas-ms.service';
import { PrismaService } from './prisma.service';
import { InvoicesController } from './invoices/invoices.controller';
import { InvoicesService } from './invoices/invoices.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [FacturasMsController, InvoicesController],
  providers: [FacturasMsService, PrismaService, InvoicesService],
})
export class FacturasMsModule {}
