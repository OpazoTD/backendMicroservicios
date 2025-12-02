import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuariosMsController } from './usuarios-ms.controller';
import { UsuariosMsService } from './usuarios-ms.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    CartModule,
  ],
  controllers: [UsuariosMsController],
  providers: [UsuariosMsService, PrismaService],
  exports: [PrismaService],
})
export class UsuariosMsModule {}
