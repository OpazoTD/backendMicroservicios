import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, In, DataSource } from 'typeorm'; // Añadimos DataSource
import { Reservation } from '../entities/reservation.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Reservation) private resRepo: Repository<Reservation>,
    @InjectRepository(Product) private prodRepo: Repository<Product>,
    private dataSource: DataSource, // Inyectamos DataSource
  ) {}

  // Se ejecuta cada 6 horas
  @Cron(CronExpression.EVERY_6_HOURS) 
  async handleCron() {
    this.logger.log('TASK: Buscando y limpiando reservas vencidas...');

    // Lógica: Fecha actual menos 3 días
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const expiredReservations = await this.resRepo.find({
      where: { 
        createdAt: LessThan(threeDaysAgo) 
      }
    });

    if (expiredReservations.length === 0) {
      this.logger.log('No se encontraron reservas vencidas.');
      return;
    }

    this.logger.warn(`Liberando stock y eliminando ${expiredReservations.length} reservas vencidas.`);

    // Usamos una transacción para procesar todos los elementos y asegurar la consistencia
    await this.dataSource.transaction(async manager => {
        for (const res of expiredReservations) {
            const productId = res.productId;
            const quantity = res.quantity;

            // 1. Disminuir el 'reservedStock' (Liberar el stock reservado)
            // El stock físico NO se incrementa porque nunca fue decrementado durante la reserva
            await manager.decrement(Product, { id: productId }, 'reservedStock', quantity);

            // 2. Eliminar la reserva
            await manager.delete(Reservation, res.id);
            
            // OPCIONAL: Emitir evento si se requiere.
        }
    });
    
    this.logger.log('Limpieza de reservas finalizada.');
  }
}