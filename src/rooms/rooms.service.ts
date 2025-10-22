import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async findAll() {
    return await this.roomRepository.find();
  }

  async findOne(id: number) {
    return await this.roomRepository.findOne({ where: { id } });
  }
}
