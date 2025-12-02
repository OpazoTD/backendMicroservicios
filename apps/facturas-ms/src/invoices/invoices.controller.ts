import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InvoicesService } from './invoices.service';

@Controller()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  // Escucha el mensaje del Gateway para obtener todas las facturas
  @MessagePattern({ cmd: 'get_all_invoices' })
  findAll() {
    return this.invoicesService.findAll();
  }

  // Escucha el mensaje del Checkout para crear una nueva factura
  @MessagePattern({ cmd: 'create_invoice' })
  create(data: any) {
    return this.invoicesService.create(data);
  }
}