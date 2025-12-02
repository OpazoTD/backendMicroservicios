import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto, RemoveFromCartDto } from '../../../../libs/common/src/dtos/cart.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern({ cmd: 'add_to_cart' })
  addToCart(dto: AddToCartDto) {
    return this.cartService.addToCart(dto);
  }

  @MessagePattern({ cmd: 'get_cart' })
  getCart(userId: number) {
    return this.cartService.getCart(userId);
  }

  @MessagePattern({ cmd: 'update_cart_item' })
  updateCartItem(payload: { userId: number; productId: number; dto: UpdateCartItemDto }) {
    return this.cartService.updateCartItem(payload.userId, payload.productId, payload.dto);
  }

  @MessagePattern({ cmd: 'remove_from_cart' })
  removeFromCart(dto: RemoveFromCartDto) {
    return this.cartService.removeFromCart(dto);
  }

  @MessagePattern({ cmd: 'clear_cart' })
  clearCart(userId: number) {
    return this.cartService.clearCart(userId);
  }

  @MessagePattern({ cmd: 'get_cart_items_by_ids' })
  getCartItemsByIds(cartItemIds: number[]) {
    return this.cartService.getCartItemsByIds(cartItemIds);
  }
}
