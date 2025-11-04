import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('user_roles')
export class UserRole extends BaseEntity {
  @Column({ type: 'uuid', unique: true, nullable: false })
  uuid: string;

  @ManyToOne(() => Role, { nullable: false, eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Relation<Role>;

  @ManyToOne(() => User, { nullable: false, eager: false })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;
}
