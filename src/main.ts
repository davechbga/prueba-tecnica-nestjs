import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API Reservas de Salas')
    .setDescription('Sistema de gestión de reservas de salas de oficina')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Ejecutar seed
  const seedService = app.get(SeedService);
  await seedService.seed();

  await app.listen(3000);
  console.log('🚀 Servidor corriendo en http://localhost:3000');
  console.log('📚 Documentación Swagger en http://localhost:3000/api');
}
bootstrap();