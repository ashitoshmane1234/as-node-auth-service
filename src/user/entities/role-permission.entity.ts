import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity('role_permissions')
export class RolePermission extends BaseEntity {
  @Column({ type: 'uuid', unique: true, nullable: false })
  uuid: string;

  @ManyToOne(() => Role, { nullable: false, eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Relation<Role>;

  @ManyToOne(() => Permission, { nullable: false, eager: true })
  @JoinColumn({ name: 'permission_id' })
  permission: Relation<Permission>;
}
