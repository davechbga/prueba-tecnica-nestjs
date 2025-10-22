import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { jwtConfig } from '../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: any) {
    console.log('JWT Strategy - Payload recibido:', payload);
    const { id } = payload;
    
    if (!id) {
      console.log('JWT Strategy - No se encontró ID en el payload');
      throw new UnauthorizedException('Token inválido - ID faltante');
    }
    
    const user = await this.userRepository.findOne({ where: { id } });
    console.log('JWT Strategy - Usuario encontrado:', user ? `ID: ${user.id}, Email: ${user.email}` : 'No encontrado');

    if (!user) {
      throw new UnauthorizedException('Token inválido - Usuario no encontrado');
    }

    return user;
  }
}