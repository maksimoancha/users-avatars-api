import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { AvatarModule } from 'src/avatar/avatar.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AvatarModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
