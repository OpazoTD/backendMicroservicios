import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; 
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Habilitar validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extras
      transform: true, // Transforma los tipos automáticamente
    }),
  );

  // 2. Habilitar CORS (Para que React pueda conectarse)
  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 3. Configurar SWAGGER (Documentación en /api)
  const config = new DocumentBuilder()
    .setTitle('E-commerce Microservices')
    .setDescription('API Gateway que orquesta Usuarios, Productos y Facturas')
    .setVersion('1.0')
    .addBearerAuth() // Habilita el candadito para poner el JWT
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  // Esto le dice a NestJS: "Monta la documentación en la ruta /api"
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Gateway corriendo en: http://localhost:3000');
  console.log('Swagger disponible en: http://localhost:3000/api');
}
bootstrap();