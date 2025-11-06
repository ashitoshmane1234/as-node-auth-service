import { Injectable } from '@nestjs/common';
import { UserAccessContext } from '../../user/models/user-access-context.model';
import { Provider } from '../enums/provider.enum';

export interface AuthenticatedUser {
  userId: number;
  userUuid: string;
  permissions: Set<string>;
  roles: Set<string>;
  token: string;
  provider: Provider;
}

@Injectable()
export class AuthenticationBuilderService {
  buildAuthentication(
    userContext: UserAccessContext,
    token: string,
    provider: Provider,
  ): AuthenticatedUser {
    return {
      userId: userContext.userId,
      userUuid: userContext.uuid,
      permissions: new Set(userContext.permissions),
      roles: new Set(userContext.roles),
      token,
      provider,
    };
  }
}
