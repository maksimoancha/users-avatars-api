import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Header,
  Query,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFileDto } from './dto/uploaded-file.dto';
import { GetAllUsersDto } from './dto/get-all-users.dto';
import { GetByIdDto } from './dto/get-by-id.dto';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create_with_avatar')
  @ApiOperation({
    summary: 'Create single user with avatar',
    description:
      'Create user with name,email,phone and image file using multipart form data.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', required: ['true'] },
        email: { type: 'string' },
        phone: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
          required: ['true'],
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Header('Content-type', 'application/json')
  async createWithAvatar(
    @UploadedFile('file') file: UploadedFileDto,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.createWithAvatar(createUserDto, file);
  }

  @Get('get_all')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users with pagination, sorted by created_at property',
  })
  getAll(@Query() params: GetAllUsersDto): Promise<User[]> {
    return this.userService.getAll(params);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Get single user with avatar by user ID',
  })
  async findOne(@Param() params: GetByIdDto) {
    return await this.userService.findOne(params.id);
  }

  @Get(':id/avatar')
  @ApiOperation({
    summary: 'Get user avatar file',
    description: 'Find user by id and return avatar file',
  })
  async getAvatarFile(@Param() params: GetByIdDto, @Res() res) {
    const { readable, mimetype } = await this.userService.getUserAvatarFile(
      params.id,
    );
    res.set({ 'Content-type': mimetype });
    readable.pipe(res);
  }
}
