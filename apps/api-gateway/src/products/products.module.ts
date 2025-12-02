import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTOS_SERVICE', // Debe coincidir con el @Inject del controlador
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1', // O el nombre del servicio en Docker
          port: 3002,        // Puerto del microservicio Productos
        },
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}