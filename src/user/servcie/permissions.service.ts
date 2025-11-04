import { Injectable } from '@nestjs/common';
import { RolePermissionsDao } from '../dao/role-permissions.dao';
import { RoleType } from '../enums/role-type.enum';

@Injectable()
export class PermissionsService {
  constructor(private readonly rolePermissionsDao: RolePermissionsDao) {}

  async permissionsByRoleType(roleType: RoleType): Promise<string[]> {
    return this.rolePermissionsDao.permissionsByRoleType(roleType);
  }
}
