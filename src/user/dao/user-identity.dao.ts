import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserIdentity } from '../entities/user-identity.entity';
import { Provider } from '../../auth/enums/provider.enum';

@Injectable()
export class UserIdentityDao {
  constructor(
    @InjectRepository(UserIdentity)
    private readonly userIdentityRepo: Repository<UserIdentity>,
  ) {}

  async userIdentityByProviderIdAndProvider(
    providerId: string,
    provider: Provider,
  ): Promise<UserIdentity | null> {
    return this.userIdentityRepo.findOne({
      where: {
        providerId,
        provider,
      },
      relations: ['user'],
    });
  }
}
