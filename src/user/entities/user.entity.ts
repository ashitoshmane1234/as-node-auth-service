import { Entity, Column, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { UserIdentity } from './user-identity.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'uuid', unique: true, nullable: true })
  uuid: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @OneToMany(() => UserIdentity, (identity) => identity.user, {
    cascade: true,
    eager: false,
    orphanedRowAction: 'delete',
  })
  userIdentities!: Relation<UserIdentity[]>;
}
