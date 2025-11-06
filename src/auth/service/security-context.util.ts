import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserSecurityContext } from '../model/user-security-context.model';
import { AuthConstant } from '../constants/auth.constant';
import { AuthenticatedUser } from './authentication-builder.service'; // your typed user

@Injectable()
export class SecurityContextUtil {
  buildUserAuthContext(req: Request): UserSecurityContext {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: AuthenticatedUser | undefined = req.user;

    if (!user) {
      throw new UnauthorizedException('No user found in request context');
    }

    // Map user properties to your UserSecurityContext
    const attributes = { [AuthConstant.USER_UUID]: user.userUuid };
    const permissions = new Set(user.permissions);
    const roles = new Set(user.roles);

    return new UserSecurityContext(attributes, permissions, roles);
  }
}
