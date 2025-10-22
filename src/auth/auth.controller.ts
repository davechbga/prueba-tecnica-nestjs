import { Body, Controller, Post, ValidationPipe, Get, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/registro.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test() {
    return { message: 'Token válido - Autenticación exitosa!' };
  }
}
