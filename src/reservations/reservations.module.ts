import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservation } from 'src/entities/reservation.entity';
import { Room } from 'src/entities/room.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Room]), AuthModule],
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
