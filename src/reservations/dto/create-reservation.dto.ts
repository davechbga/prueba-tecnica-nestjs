import { IsNotEmpty, IsNumber, IsDateString, Matches } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'horaInicio debe estar en formato HH:MM',
  })
  horaInicio: string;

  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'horaFin debe estar en formato HH:MM',
  })
  horaFin: string;
}
