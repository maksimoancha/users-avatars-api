import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneWithAvatar(condition): Promise<User> {
    return await this.findOne({ where: condition, relations: ['avatar'] });
  }

  async findManyWithAvatar(params): Promise<User[]> {
    return await this.find({
      ...params,
      order: { createdAt: 1 },
      relations: ['avatar'],
    });
  }
}
