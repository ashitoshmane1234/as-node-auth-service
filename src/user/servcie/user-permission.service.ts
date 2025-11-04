import { Injectable } from '@nestjs/common';
import { RoleService } from './role.service';
import { PermissionsService } from './permissions.service';
import { UserService } from './user.service';
import { Provider } from '../../auth/enums/provider.enum';
import { UserAccessContext } from '../models/user-access-context.model';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserPermissionService {
  constructor(
    private readonly roleService: RoleService,
    private readonly permissionsService: PermissionsService,
    private readonly userService: UserService,
  ) {}

  async validateAndResolveUserPermissions(
    providerId: string,
    provider: Provider,
  ): Promise<UserAccessContext> {
    const user: UserModel = await this.userService.userByProviderId(
      providerId,
      provider,
    );
    const userRoles = await this.roleService.userRolesByUserId(user.id);

    const roleNames: string[] = userRoles.map((ur) => ur.role.roleType);
    const permissions: string[] = (
      await Promise.all(
        userRoles.map((ur) =>
          this.permissionsService.permissionsByRoleType(ur.role.roleType),
        ),
      )
    ).flat();

    return new UserAccessContext(user.id, user.uuid, permissions, roleNames);
  }
}
