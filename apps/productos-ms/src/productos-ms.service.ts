import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductosMsService {
  getHello(): string {
    return 'Productos Microservice is running!';
  }
}