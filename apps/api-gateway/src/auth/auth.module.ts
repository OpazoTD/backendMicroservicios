import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    //se usa el ConfigModule para leer el JWT_SECRET del .env
    ConfigModule,
    
    // Config para autenticación
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' }, // Token válido por 60 minutos
      }),
      inject: [ConfigService],
    }),

    // Registro del Cliente para hablar con Usuarios MS
    ClientsModule.register([
      {
        name: 'USUARIOS_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3001 },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // JwtStrategy valida el token recibido
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}