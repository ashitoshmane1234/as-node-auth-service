// auth/guards/jwt-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../service/auth.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import type { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    // Allow public endpoints without auth
    if (!authHeader) {
      return true;
    }

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Missing bearer token');

    const user = await this.authService.validateToken(token);
    request.user = user;

    // Check for required roles (if any)
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];

    if (requiredRoles.length > 0) {
      const userRoles = Array.from(user.roles);
      const hasRole = requiredRoles.some((r) => userRoles.includes(r));
      if (!hasRole)
        throw new ForbiddenException(
          `Access denied. Required roles: ${requiredRoles.join(', ')}`,
        );
    }

    return true;
  }
}
