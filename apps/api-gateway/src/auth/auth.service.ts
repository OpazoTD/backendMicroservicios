import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from '../../../../libs/common/src/dtos/login.dto'; // Asume que el DTO está en common

@Injectable()
export class AuthService {
  constructor(
    @Inject('USUARIOS_SERVICE') private usersClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    // Llamar al Microservicio de Usuarios para validar credenciales.
    const user = await firstValueFrom(
      this.usersClient.send({ cmd: 'validate_user' }, { 
        email: loginDto.email, 
        password: loginDto.password 
      }),
    ).catch((err) => {
      // Manejar de errores de conexión o RPC
      console.error('Error al contactar Usuarios MS:', err);
      throw new UnauthorizedException('Error de servicio de autenticación.');
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }
    return user;
  }

  async login(user: any) {
    // Si las credenciales son válidas, firma el token.
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, role: user.role }
    };
  }
}