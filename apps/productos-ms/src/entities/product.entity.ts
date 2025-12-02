import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity'; 
@Entity('products_table')
export class Product {
  @PrimaryGeneratedColumn()
  id: number; // Manteniendo 'number' como ID

  @Column({ length: 100 })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stock: number; // Stock físico real

  //Columna necesaria para la gestión del stock
  @Column('int', { default: 0 }) 
  reservedStock: number; // Stock que ha sido reservado por un carrito pendiente

  @CreateDateColumn()
  createdAt: Date; 
  
  // Relación con las reservas
  @OneToMany(() => Reservation, reservation => reservation.product)
  reservations: Reservation[];
}