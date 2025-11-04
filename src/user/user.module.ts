import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../user/controller/user.controller';
import { UserPermissionService } from '../user/servcie/user-permission.service';
import { UserService } from '../user/servcie/user.service';
import { RoleService } from '../user/servcie/role.service';
import { PermissionsService } from '../user/servcie/permissions.service';

import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UserIdentity } from './entities/user-identity.entity';
import { UserRole } from './entities/user-role.entity';
import { RolePermission } from './entities/role-permission.entity';
import { UserIdentityDao } from './dao/user-identity.dao';
import { RoleDao } from './dao/role.dao';
import { RolePermissionsDao } from './dao/role-permissions.dao';
import { UserRoleDao } from './dao/user-role.dao';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Permission,
      UserIdentity,
      UserRole,
      RolePermission,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserPermissionService,
    UserService,
    RoleService,
    PermissionsService,
    UserIdentityDao,
    RoleDao,
    RolePermissionsDao,
    UserRoleDao,
  ],
  exports: [UserPermissionService],
})
export class UserModule {}
