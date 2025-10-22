import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/registro.dto';
import { AuthService } from './auth.service';

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
}
