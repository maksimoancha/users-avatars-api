import { Test, TestingModule } from '@nestjs/testing';
import { AvatarModule } from 'src/avatar/avatar.module';
import { AvatarService } from 'src/avatar/avatar.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AvatarModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
