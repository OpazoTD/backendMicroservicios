import { Injectable } from '@nestjs/common';

@Injectable()
export class FacturasMsService {
  getHello(): string {
    return 'Facturas Microservice - MongoDB + Prisma';
  }
}
