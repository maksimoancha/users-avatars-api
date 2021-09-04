import { Injectable } from '@nestjs/common';

@Injectable()
export class AvatarService {
  findOne(id: number) {
    return `This action returns a #${id} avatar`;
  }
}
