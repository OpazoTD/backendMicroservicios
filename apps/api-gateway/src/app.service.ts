import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'E-commerce API Gateway',
      version: '1.0.0',
      status: 'running',
      documentation: 'http://localhost:3000/api',
      services: {
        usuarios: 'tcp://127.0.0.1:3001',
        productos: 'tcp://127.0.0.1:3002',
        facturas: 'tcp://127.0.0.1:3003',
      }
    };
  }
}
