import {
  Controller,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { SecurityContextUtil } from '../../auth/service/security-context.util';
import type { Request } from 'express';

@Controller('v1/users')
export class UserController {
  constructor(private readonly securityContext: SecurityContextUtil) {}

  // Authenticated-only
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getAuthenticatedUser(@Req() req: Request) {
    const context = this.securityContext.buildUserAuthContext(req);
    return {
      message: 'Authenticated user fetched successfully',
      userContext: {
        attributes: context.attributes,
        permissions: Array.from(context.permissions),
        roles: Array.from(context.roles),
      },
    };
  }

  // Public endpoint — no guard, no token needed
  @Get('public')
  getPublicData() {
    return {
      message: 'This endpoint does not require authentication',
      timestamp: new Date().toISOString(),
    };
  }

  // Role-restricted endpoint
  @UseGuards(JwtAuthGuard)
  @Roles('SUPER_ADMIN')
  @Get('admin/dashboard')
  getAdminDashboard(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: `Welcome, ${user.userUuid}, you are a SUPER_ADMIN.`,
      time: new Date().toISOString(),
    };
  }
}
