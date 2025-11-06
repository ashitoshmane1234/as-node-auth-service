import { Injectable } from '@nestjs/common';
import { UserPermissionService } from '../../user/servcie/user-permission.service';
import { UserAccessContext } from '../../user/models/user-access-context.model';
import { Provider } from '../enums/provider.enum';

@Injectable()
export class IdentityPermissionResolverService {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  async resolvePermissions(
    providerId: string,
    provider: Provider,
  ): Promise<UserAccessContext> {
    switch (provider) {
      case Provider.AUTH0:
        return this.userPermissionService.validateAndResolveUserPermissions(
          providerId,
          provider,
        );
      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}
