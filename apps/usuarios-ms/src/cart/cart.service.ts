import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto, RemoveFromCartDto } from '../../../../libs/common/src/dtos/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(dto: AddToCartDto) {
    const { userId, productId, quantity } = dto;

    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Verificar si el item ya existe en el carrito
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingItem) {
      // Si existe, actualizar la cantidad
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    }

    // Si no existe, crear nuevo item
    return this.prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
  }

  async getCart(userId: number) {
    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.prisma.cartItem.findMany({
      where: { userId },
      orderBy: { id: 'asc' },
    });
  }

  async updateCartItem(userId: number, productId: number, dto: UpdateCartItemDto) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item not found`);
    }

    if (dto.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    return this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: dto.quantity },
    });
  }

  async removeFromCart(dto: RemoveFromCartDto) {
    const { userId, productId } = dto;

    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item not found`);
    }

    await this.prisma.cartItem.delete({ where: { id: cartItem.id } });

    return { message: 'Item removed from cart successfully' };
  }

  async clearCart(userId: number) {
    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.prisma.cartItem.deleteMany({
      where: { userId },
    });

    return { message: 'Cart cleared successfully' };
  }

  async getCartItemsByIds(cartItemIds: number[]) {
    return this.prisma.cartItem.findMany({
      where: {
        id: {
          in: cartItemIds,
        },
      },
    });
  }
}
