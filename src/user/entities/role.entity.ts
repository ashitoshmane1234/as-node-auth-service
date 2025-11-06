import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { RoleType } from '../enums/role-type.enum';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'uuid', unique: true, nullable: false })
  uuid: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'role_type', type: 'enum', enum: RoleType, nullable: true })
  roleType: RoleType;
}
