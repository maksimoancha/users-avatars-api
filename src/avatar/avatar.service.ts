import { Injectable } from '@nestjs/common';
import { UploadedFileDto } from 'src/user/dto/uploaded-file.dto';
import { User } from 'src/user/entities/user.entity';
import { AvatarRepository } from './repositories/avatar.repository';

@Injectable()
export class AvatarService {
  constructor(private readonly avatarRepository: AvatarRepository) {}
  async createWithUser(uploadedFileDto: UploadedFileDto, user: User) {
    const avatar = this.avatarRepository.create({
      mimetype: uploadedFileDto.mimetype,
      base64Content: uploadedFileDto.buffer.toString('base64'),
    });
    avatar.user = user;
    return await this.avatarRepository.save(avatar);
  }
}
