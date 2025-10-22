import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, User])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}