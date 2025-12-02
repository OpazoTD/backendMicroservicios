import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  //constructor para configurar el cliente base
  constructor() {
    super({
      log: [
        // Aquí le indicamos a Prisma que queremos escuchar el evento 'beforeExit'
        { level: 'warn', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
  async enableShutdownHooks(app: INestApplication) {
    (this as any).$on('beforeExit', async () => {
      // Cerramos la app de Nest para permitir un shutdown ordenado
      await app.close();
      // Usamos $disconnect() para cerrar la conexión de Prisma de forma segura
      await this.$disconnect();
    });
  }
}