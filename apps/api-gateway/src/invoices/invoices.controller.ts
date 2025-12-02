import {
  Controller,
  Get,
  UseGuards,
  Req,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Define la estructura del objeto Request después de pasar por el JwtAuthGuard
interface AuthenticatedRequest {
  user: {
    userId: number;
    email: string;
    role: 'ADMIN' | 'USER' | string;
  };
}

@ApiTags('Facturas')
@Controller('invoices')
export class InvoicesController {
  constructor(
    // Conexión al Microservicio de Facturas (Mongo/3003)
    @Inject('FACTURAS_SERVICE') private readonly facturasClient: ClientProxy,
    // Conexión al Microservicio de Usuarios (Postgres/3001)
    @Inject('USUARIOS_SERVICE') private readonly usuariosClient: ClientProxy,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) //Protege la ruta con el token JWT
  @Get()
  // Aplicamos la interfaz al parámetro 'req'
  async getAllInvoices(@Req() req: AuthenticatedRequest) {
    // req.user contiene { userId, email, role } gracias al JwtAuthGuard

    //Solo los ADMIN pueden ver todas las facturas.
    if (req.user.role !== 'ADMIN') {
      // Lanza un error HTTP 401 si el usuario no tiene permisos.
      throw new UnauthorizedException(
        'Acceso denegado. Se requiere rol de Administrador.',
      );
    }

    // OBTENIENE DATOS PRINCIPALES
    const facturas = await firstValueFrom(
      this.facturasClient.send({ cmd: 'get_all_invoices' }, {}),
    );

    // Recolecta todos los IDs únicos de usuarios de las facturas.
    const userIds = [...new Set(facturas.map((f: any) => f.userId))];

    // Pide los detalles completos de esos usuarios al MS Usuarios en una sola llamada (Bulk)
    const usersMap: Record<number, any> = await firstValueFrom(
      this.usuariosClient.send({ cmd: 'get_users_by_ids' }, userIds),
    );

    // Recorre las facturas y agrega el objeto de usuario correspondiente.
    return facturas.map((factura: any) => {
      const user = usersMap[factura.userId];

      // Retorna la factura con el objeto 'user' enriquecido.
      return {
        ...factura,
        user: user || { name: 'Desconocido', email: 'N/A', role: 'N/A' }, // Fallback si el usuario no existe
      };
    });
  }
}
