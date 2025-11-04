import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../entities/user-role.entity';

@Injectable()
export class UserRoleDao {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
  ) {}

  async userRolesByUserId(userId: number): Promise<UserRole[]> {
    return this.userRoleRepo.find({
      where: { user: { id: userId } },
      relations: ['role'],
    });
  }
}
