import { Controller, Get, Post, Body, Param, Delete, UseGuards, ValidationPipe, Request } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(
    @Body(ValidationPipe) createReservationDto: CreateReservationDto,
    @Request() req,
  ) {
    return this.reservationsService.create(createReservationDto, req.user);
  }

  @Get('user')
  findByUser(@Request() req) {
    return this.reservationsService.findByUser(req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.reservationsService.remove(+id, req.user);
  }
}
