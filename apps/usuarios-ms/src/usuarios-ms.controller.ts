import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsuariosMsService } from './usuarios-ms.service';

@Controller()
export class UsuariosMsController {
  constructor(private readonly usuariosMsService: UsuariosMsService) {}

  @MessagePattern({ cmd: 'health_check' })
  healthCheck(): string {
    return this.usuariosMsService.getHello();
  }
}
