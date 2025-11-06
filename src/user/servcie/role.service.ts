import { Injectable } from '@nestjs/common';
import { RoleDao } from '../dao/role.dao';
import { UserRoleDao } from '../dao/user-role.dao';
import { RoleType } from '../enums/role-type.enum';
import { Role } from '../entities/role.entity';
import { UserRole } from '../entities/user-role.entity';

@Injectable()
export class RoleService {
  constructor(
    private readonly userRoleDao: UserRoleDao,
    private readonly roleDao: RoleDao,
  ) {}

  async userRolesByUserId(userId: number): Promise<UserRole[]> {
    return this.userRoleDao.userRolesByUserId(userId);
  }

  async roleByRoleType(roleType: RoleType): Promise<Role> {
    const role = await this.roleDao.findByRoleType(roleType);
    if (!role) throw new Error('Role not found');
    return role;
  }
}
