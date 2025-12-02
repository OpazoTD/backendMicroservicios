import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    
    // OBTIENE Y VERIFICAR EL SECRETO (La corrección clave)
    const secret = configService.get<string>('JWT_SECRET');

    //Validación de Entorno
    if (!secret) {
        console.error("CRITICAL ERROR: JWT_SECRET no cargado. Revise el archivo .env.");
        throw new Error('JWT_SECRET no disponible al iniciar la estrategia de Passport.');
    }

    // LLAMA A SUPER() CON EL SECRETO VERIFICADO
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // Usa la var local 'secret'
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}