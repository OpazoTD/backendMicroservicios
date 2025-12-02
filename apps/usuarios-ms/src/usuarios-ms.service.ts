import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosMsService {
  getHello(): string {
    return 'Usuarios Microservice is running!';
  }
}
