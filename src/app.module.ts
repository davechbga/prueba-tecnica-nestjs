import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SeedModule } from './seed/seed.module';
import { User } from './entities/user.entity';
import { Room } from './entities/room.entity';
import { Reservation } from './entities/reservation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Room, Reservation],
      synchronize: true, // Solo para desarrollo
    }),
    AuthModule,
    RoomsModule,
    ReservationsModule,
    SeedModule,
  ],
})
export class AppModule {}