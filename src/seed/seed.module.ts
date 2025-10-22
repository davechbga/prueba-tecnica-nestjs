import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Room } from '../entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}