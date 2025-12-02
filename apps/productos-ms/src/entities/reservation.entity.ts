import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_reservations') 
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  // Usa la relación ManyToOne
  @Column()
  productId: number;
  @ManyToOne(() => Product, product => product.reservations)
  product: Product;
  
  // Asumiendo que User MS usa IDs de tipo `number` o `uuid` 
  @Column('int') 
  userId: number; // Quién hizo la reserva

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  createdAt: Date; // Crucial para la limpieza por el Cron job
}