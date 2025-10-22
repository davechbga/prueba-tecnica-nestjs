import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seed() {
    const roomCount = await this.roomRepository.count();
    const userCount = await this.userRepository.count();
    
    if (roomCount > 0 && userCount > 0) {
      console.log('La base de datos ya tiene datos, omitiendo seed...');
      return;
    }

    // Crear usuario de prueba
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const testUser = this.userRepository.create({
        nombre: 'Usuario de Prueba',
        email: 'test@ejemplo.com',
        password: hashedPassword,
      });
      await this.userRepository.save(testUser);
      console.log('✅ Usuario de prueba creado: test@ejemplo.com / password123');
    }

    // Crear salas
    if (roomCount === 0) {
      const rooms = [
        { nombre: 'Sala Ejecutiva A', capacidad: 10 },
        { nombre: 'Sala de Conferencias', capacidad: 25 },
        { nombre: 'Sala Pequeña 1', capacidad: 4 },
        { nombre: 'Sala Pequeña 2', capacidad: 4 },
        { nombre: 'Auditorio Principal', capacidad: 100 },
      ];

      for (const room of rooms) {
        await this.roomRepository.save(room);
      }
      console.log('✅ Seed completado: 5 salas creadas');
    }
  }
}