import { Controller, Post, Body, Req, UseGuards, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReservationDto } from '../../../../libs/common/src/dtos/create-product.dto';

// Interfaz para tipado del usuario autenticado
interface AuthenticatedRequest {
  user: { userId: number; email: string; role: string; };
}

@ApiTags('Carrito')
@Controller('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    @Inject('USUARIOS_SERVICE') private readonly usersClient: ClientProxy,
    @Inject('PRODUCTOS_SERVICE') private readonly productsClient: ClientProxy,
    @Inject('FACTURAS_SERVICE') private readonly invoicesClient: ClientProxy,
  ) {}

  @Post('add')
  async addItemToCart(@Body() body: { productId: number; quantity: number }, @Req() req: AuthenticatedRequest) {
    const { userId } = req.user;
    
    // DTO de reserva
    const reservationDto: ReservationDto = {
      productId: body.productId,
      userId: userId,
      quantity: body.quantity,
    };
    
    // Intenta reservar el stock
    try {
      const reservation = await firstValueFrom(
        this.productsClient.send({ cmd: 'create_reservation' }, reservationDto)
      );
      
      // Si la reserva fue exitosa, añadir al carrito de forma virtual
      const cartItem = await firstValueFrom(
        this.usersClient.send({ cmd: 'add_to_cart' }, { userId, productId: body.productId, quantity: body.quantity })
      );
      
      return { success: true, cartItem, reservationId: reservation.id };

    } catch (error) {
      // Manejar errores de stock insuficiente
      if (error.message.includes('Stock insuficiente')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Post('checkout')
  async checkout(@Req() req: AuthenticatedRequest) {
    const { userId } = req.user;

    // Obtiene items del carrito y calcula el total
    const cartDetails = await firstValueFrom(
        this.usersClient.send({ cmd: 'get_cart_details' }, userId)
    );
    
    if (cartDetails.items.length === 0) {
        throw new NotFoundException('El carrito está vacío.');
    }

    //Crea la factura final
    const invoiceData = {
        userId: userId,
        total: cartDetails.total,
        items: cartDetails.items, // Contiene info de producto y cantidad
    };
    const newInvoice = await firstValueFrom(
      this.invoicesClient.send({ cmd: 'create_invoice' }, invoiceData)
    );

    //  Confirma la compra (Modificar stock real)
    await firstValueFrom(
        this.productsClient.send({ cmd: 'confirm_purchase' }, { userId, items: cartDetails.items })
    );

    // Vaciar el carrito
    await firstValueFrom(
        this.usersClient.send({ cmd: 'clear_cart' }, userId)
    );

    return { message: 'Compra completada', invoice: newInvoice };
  }
}