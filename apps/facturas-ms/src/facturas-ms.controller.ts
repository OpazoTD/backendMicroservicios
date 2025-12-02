import { Controller, Get } from '@nestjs/common';
import { FacturasMsService } from './facturas-ms.service';

@Controller()
export class FacturasMsController {
  constructor(private readonly facturasMsService: FacturasMsService) {}

  @Get()
  getHello(): string {
    return this.facturasMsService.getHello();
  }
}
