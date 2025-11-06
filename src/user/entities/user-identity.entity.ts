import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from './user.entity';
import { Provider } from '../../auth/enums/provider.enum';

@Entity('user_identities')
export class UserIdentity extends BaseEntity {
  @Column({
    type: 'uuid',
    unique: true,
    nullable: false,
  })
  uuid: string;

  @ManyToOne(() => User, (user) => user.userIdentities, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: Provider,
    nullable: false,
  })
  provider: Provider;

  @Column({ name: 'provider_id', nullable: false })
  providerId: string;
}
