import { Controller, Get, Post, Body, Req, UseGuards, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from '../../../../libs/common/src/dtos/create-product.dto';

// Interfaz para tipado del usuario autenticado
interface AuthenticatedRequest {
  user: { userId: number; email: string; role: string; };
}

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCTOS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @Get()
  // No requiere autenticación para ver el catálogo
  async findAll() {
    // Llama al MS Productos para obtener todos los productos
    return firstValueFrom(
      this.productsClient.send({ cmd: 'get_all_products' }, {})
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() req: AuthenticatedRequest) {
    //Solo ADMIN puede crear productos
    if (req.user.role !== 'ADMIN') {
      throw new UnauthorizedException('Acceso denegado. Se requiere rol de Administrador.');
    }
    
    // Envia la solicitud de creación al MS Productos
    return firstValueFrom(
      this.productsClient.send({ cmd: 'create_product' }, createProductDto)
    );
  }
}