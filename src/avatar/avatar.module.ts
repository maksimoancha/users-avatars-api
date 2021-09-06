import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarRepository } from './repositories/avatar.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AvatarRepository])],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule {}
