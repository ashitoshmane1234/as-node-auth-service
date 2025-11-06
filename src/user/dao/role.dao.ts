import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { RoleType } from '../enums/role-type.enum';

@Injectable()
export class RoleDao {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async findByRoleType(roleType: RoleType): Promise<Role | null> {
    return this.roleRepo.findOne({ where: { roleType } });
  }
}
