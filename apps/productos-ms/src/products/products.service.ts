import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// Importamos 'In' y 'UpdateResult' para tipado y consultas de arrays de IDs
import { DataSource, Repository, In, UpdateResult } from 'typeorm'; 
import { Product } from '../entities/product.entity';
import { Reservation } from '../entities/reservation.entity';
// Asegúrate de que estos DTOs existan en la ruta especificada
// Asumimos que PurchaseItemsDto se define o se importa desde aquí
import { CreateProductDto, ReservationDto } from '../../../../libs/common/src/dtos/create-product.dto'; 
import { PurchaseItemsDto } from '../../../../libs/common/src/dtos/purchase-items.dto'; 

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private dataSource: DataSource,
  ) {}
  
  // --- CRUD BÁSICO ---

  async create(dto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(dto);
    return this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
  
  /**
   * Obtiene productos por lista de IDs (corregido con TypeORM In).
   */
  async getProductsByIds(ids: number[]): Promise<Product[]> {
    // *** CORRECCIÓN ***: Usamos el operador 'In' para buscar dentro de un array de IDs
    return this.productRepository.findBy({ 
        id: In(ids) 
    }); 
  }

  // --- LÓGICA DE RESERVAS ---

  async createReservation(dto: ReservationDto): Promise<Reservation> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { productId, userId, quantity } = dto;
      
      const product = await queryRunner.manager.findOne(Product, { 
        where: { id: productId } 
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found.`);
      }

      // Verificación de stock disponible (Stock físico - Stock reservado)
      if (product.stock - product.reservedStock < quantity) {
        throw new BadRequestException(`Insufficient stock for product ${productId}. Available: ${product.stock - product.reservedStock}`);
      }

      // 1. Crear la entrada de reserva
      const newReservation = queryRunner.manager.create(Reservation, {
        productId,
        userId,
        quantity,
      });
      await queryRunner.manager.save(newReservation);
      
      // 2. Aumentar el stock reservado en el producto
      await queryRunner.manager.increment(
        Product, 
        { id: productId }, 
        'reservedStock', 
        quantity
      );
      
      await queryRunner.commitTransaction();
      return newReservation;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      // Usamos el mensaje de error original para mejor depuración si no es un error controlado (404/400)
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
          throw error;
      }
      throw new InternalServerErrorException(`Reservation failed: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Cancela una reserva específica, liberando el stock reservado.
   */
  async cancelReservation(reservationId: number): Promise<void> {
    const reservation = await this.reservationRepository.findOne({ 
      where: { id: reservationId }
    });

    if (!reservation) {
      // Si la reserva no existe (por ejemplo, ya fue limpiada por el Cron), simplemente terminamos.
      return; 
    }

    const { productId, quantity } = reservation;

    await this.dataSource.transaction(async manager => {
      // 1. Disminuir el stock reservado
      await manager.decrement(Product, { id: productId }, 'reservedStock', quantity);
      // 2. Eliminar la reserva
      await manager.delete(Reservation, reservationId);
    });
  }

  // --- LÓGICA DE COMPRA FINAL (Confirmación) ---

  /**
   * CONFIRMACIÓN DE COMPRA:
   * Resta la cantidad comprada del 'stock' físico y simultáneamente
   * resta la misma cantidad de 'reservedStock'.
   * * @param items Un array de objetos con productId y quantity a comprar.
   * @returns Un array de UpdateResult de TypeORM.
   */
  async confirmPurchase(items: PurchaseItemsDto['items']): Promise<UpdateResult[]> {
    // Usamos la promesa del Transaction Manager para asegurar que todas las operaciones
    // se completen o fallen juntas.
    return this.dataSource.transaction(async manager => {
      // Definimos el tipo de 'results' como un array de UpdateResult
      const results: UpdateResult[] = []; 
      
      for (const item of items) {
        // Validar que el producto existe y tiene suficiente stock
        const product = await manager.findOne(Product, { 
          where: { id: item.productId } 
        });
        
        if (!product) {
          throw new NotFoundException(`Product with ID ${item.productId} not found.`);
        }
        
        if (product.stock < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${item.productId}. Available: ${product.stock}, Requested: ${item.quantity}`
          );
        }
        
        if (product.reservedStock < item.quantity) {
          throw new BadRequestException(
            `Reserved stock mismatch for product ${item.productId}. Reserved: ${product.reservedStock}, Requested: ${item.quantity}`
          );
        }
        
        // Ejecución de la actualización atómica en la base de datos.
        const result = await manager.update(Product, 
          { id: item.productId }, 
          {
            // Usamos la función SQL para asegurar la operación atómica de resta
            stock: () => `stock - ${item.quantity}`, 
            reservedStock: () => `reservedStock - ${item.quantity}`, 
          }
        );
        // **ESTA LÍNEA ES CORRECTA** y añade el resultado de la actualización al array.
        results.push(result); 
      }
      
      return results;
    });
  }
}