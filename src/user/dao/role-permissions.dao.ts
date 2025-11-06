import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from '../entities/role-permission.entity';
import { RoleType } from '../enums/role-type.enum';

@Injectable()
export class RolePermissionsDao {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepo: Repository<RolePermission>,
  ) {}

  async permissionsByRoleType(roleType: RoleType): Promise<string[]> {
    const rolePermissions = await this.rolePermissionRepo
      .createQueryBuilder('rp')
      .leftJoinAndSelect('rp.role', 'role')
      .leftJoinAndSelect('rp.permission', 'permission')
      .where('role.roleType = :roleType', { roleType })
      .getMany();

    return rolePermissions.map((rp) => rp.permission.name);
  }
}
