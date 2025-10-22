import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async seed() {
    const count = await this.roomRepository.count();
    
    if (count > 0) {
      console.log('La base de datos ya tiene datos, omitiendo seed...');
      return;
    }

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