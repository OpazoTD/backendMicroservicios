import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { Reservation } from '../entities/reservation.entity';
import { TasksService } from '../tasks/tasks.service'; // Importamos el servicio de tareas

@Module({
  imports: [
    // Inclusión de las entidades en el módulo
    TypeOrmModule.forFeature([Product, Reservation]), 
  ],
  controllers: [ProductsController],
  providers: [ProductsService, TasksService], // Añadimos TasksService
  exports: [ProductsService]
})
export class ProductsModule {}