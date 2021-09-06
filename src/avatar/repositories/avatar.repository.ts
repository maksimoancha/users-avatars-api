import { EntityRepository, Repository } from 'typeorm';
import { Avatar } from '../entities/avatar.entity';

@EntityRepository(Avatar)
export class AvatarRepository extends Repository<Avatar> {}
