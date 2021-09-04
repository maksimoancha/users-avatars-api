import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Response,
  Header,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, read } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';
import { UploadedFileDto } from './dto/uploaded-file.dto';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create new user',
    description:
      'This action will create new user with specified params and return user' +
      '<br/><b>Required fields</b>: name\n' +
      '<br/><b>Optional fields</b>: email, phone',
  })
  @ApiResponse({
    status: 200,
    description: 'User entity',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Post('create_with_avatar')
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
  createWithAvatar(
    @UploadedFile('file') file: UploadedFileDto,
    @Body() createUserDto: CreateUserDto,
    @Response() res,
  ) {
    console.log(file);
    console.log(createUserDto);
    const base64Content = file.buffer.toString('base64');

    const readable = new Readable();
    readable._read = () => {};
    readable.push(Buffer.from(base64Content, 'base64'));
    readable.push(null);

    res.set({ 'Content-type': 'image/png' });
    readable.pipe(res);
  }

  @Get()
  findAll(): unknown {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): unknown {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): unknown {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): unknown {
    return this.userService.remove(+id);
  }
}
