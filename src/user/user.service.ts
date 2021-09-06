import { Injectable } from '@nestjs/common';
import { AvatarService } from 'src/avatar/avatar.service';
import { Readable, Stream } from 'stream';
import { CreateUserDto } from './dto/create-user.dto';
import { GetAllUsersDto } from './dto/get-all-users.dto';
import { UploadedFileDto } from './dto/uploaded-file.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly avatarService: AvatarService,
  ) {}

  async createWithAvatar(
    createUserDto: CreateUserDto,
    uploadedFileDto: UploadedFileDto,
  ): Promise<User> {
    const user: User = await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );
    await this.avatarService.createWithUser(uploadedFileDto, user);
    return await this.userRepository.findOneWithAvatar({ id: user.id });
  }

  async getAll(params: GetAllUsersDto): Promise<User[]> {
    return this.userRepository.findManyWithAvatar(params);
  }

  async findOne(id: string) {
    return await this.userRepository.findOneWithAvatar({ id });
  }

  async getUserAvatarFile(
    id: string,
  ): Promise<{ readable: Stream; mimetype: string }> {
    const user: User = await this.userRepository.findOneWithAvatar({ id });

    const readable: Readable = new Readable();
    readable.push(Buffer.from(user.avatar.base64Content, 'base64'));
    readable.push(null);

    return { readable, mimetype: user.avatar.mimetype };
  }
}
