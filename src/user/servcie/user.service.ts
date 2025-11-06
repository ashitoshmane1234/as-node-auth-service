import { Injectable } from '@nestjs/common';
import { UserIdentityDao } from '../dao/user-identity.dao';
import { Provider } from '../../auth/enums/provider.enum';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userIdentityDao: UserIdentityDao) {}

  async userByProviderId(
    providerId: string,
    provider: Provider,
  ): Promise<UserModel> {
    const identity =
      await this.userIdentityDao.userIdentityByProviderIdAndProvider(
        providerId,
        provider,
      );

    if (!identity) throw new Error('User not found');

    // ensure the return type is UserModel
    const user: UserModel = {
      id: identity.user.id,
      uuid: identity.user.uuid,
      email: identity.user.email,
    };

    return user;
  }
}
