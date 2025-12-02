import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductosMsService } from './productos-ms.service';

@Controller()
export class ProductosMsController {
  constructor(private readonly productosMsService: ProductosMsService) {}

  @MessagePattern({ cmd: 'health_check' })
  healthCheck(): string {
    return this.productosMsService.getHello();
  }
}
