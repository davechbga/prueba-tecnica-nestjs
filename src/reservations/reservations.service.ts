import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { Room } from 'src/entities/room.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createReservationDto: CreateReservationDto, user: User) {
    const { roomId, fecha, horaInicio, horaFin } = createReservationDto;
    if (horaInicio >= horaFin) {
      throw new Error('La hora de inicio debe ser anterior a la hora de fin');
    }

    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) {
      throw new Error('Sala no encontrada');
    }

    const overlappingReservations = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.roomId = :roomId', { roomId })
      .andWhere('reservation.fecha = :fecha', { fecha })
      .andWhere(
        '(reservation.horaInicio < :horaFin AND reservation.horaFin > :horaInicio)',
        { horaInicio, horaFin },
      )
      .getCount();

    if (overlappingReservations) {
      throw new Error('La sala ya está reservada en el horario seleccionado');
    }

    const conflictingUserReservation = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.userId = :userId', { userId: user.id })
      .andWhere('reservation.fecha = :fecha', { fecha })
      .andWhere(
        '(reservation.horaInicio < :horaFin AND reservation.horaFin > :horaInicio)',
        { horaInicio, horaFin },
      )
      .getOne();

    if (conflictingUserReservation) {
      throw new ConflictException('Ya tienes una reserva en ese horario');
    }

    const reservation = this.reservationRepository.create({
      roomId,
      userId: user.id,
      fecha,
      horaInicio,
      horaFin,
    });

    await this.reservationRepository.save(reservation);

    return {
      message: 'Reserva creada exitosamente',
      reservation: {
        id: reservation.id,
        fecha: reservation.fecha,
        horaInicio: reservation.horaInicio,
        horaFin: reservation.horaFin,
        room: room.nombre,
      },
    };
  }

  async findByUser(userId: number) {
    return await this.reservationRepository.find({
      where: { userId },
      relations: ['room'],
      order: { fecha: 'ASC', horaInicio: 'ASC' },
    });
  }

  async remove(id: number, user: User) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException('Reserva no encontrada');
    }

    if (reservation.userId !== user.id) {
      throw new BadRequestException(
        'No puedes cancelar una reserva que no es tuya',
      );
    }

    await this.reservationRepository.remove(reservation);

    return {
      message: 'Reserva cancelada exitosamente',
    };
  }
}
