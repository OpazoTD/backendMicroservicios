import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';
// Asumiendo que los DTOs están definidos y disponibles
import { CreateProductDto, ReservationDto } from '../../../../libs/common/src/dtos/create-product.dto'; 
import { PurchaseItemsDto } from '../../../../libs/common/src/dtos/purchase-items.dto'; 

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create_product' })
  create(dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @MessagePattern({ cmd: 'get_all_products' })
  findAll() {
    return this.productsService.findAll();
  }

  // Nuevo comando para obtener productos por IDs (para composición en Gateway/Users MS)
  @MessagePattern({ cmd: 'get_products_by_ids' })
  getByIds(ids: number[]) {
    return this.productsService.getProductsByIds(ids);
  }
  
  // MessagePattern para crear una reserva de stock (Parte del flujo del carrito)
  @MessagePattern({ cmd: 'create_reservation' })
  createReservation(dto: ReservationDto) {
    return this.productsService.createReservation(dto);
  }

  // Nuevo comando: Finalizar la compra (Restar stock físico y liberar reserva)
  @MessagePattern({ cmd: 'confirm_purchase' })
  confirmPurchase(dto: PurchaseItemsDto) {
    return this.productsService.confirmPurchase(dto.items);
  }

  // Nuevo comando: Cancelar una reserva específica (Se usa para devolver stock al fallar el checkout)
  @MessagePattern({ cmd: 'cancel_reservation' })
  cancelReservation(reservationId: number) {
    return this.productsService.cancelReservation(reservationId);
  }
}