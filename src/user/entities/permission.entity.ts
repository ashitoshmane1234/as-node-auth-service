import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ type: 'uuid', unique: true, nullable: false })
  uuid: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;
}
