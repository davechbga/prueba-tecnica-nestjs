import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard - Verificando autenticación...');
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    console.log('JwtAuthGuard - Authorization header:', authHeader);
    
    return super.canActivate(context);
  }
}