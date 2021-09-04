import { Controller, Get, Param } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avatarService.findOne(+id);
  }
}