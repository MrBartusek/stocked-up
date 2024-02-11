import { Test, TestingModule } from '@nestjs/testing';
import { AuthEmailsService } from './auth-emails.service';

describe('AuthEmailsService', () => {
  let service: AuthEmailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthEmailsService],
    }).compile();

    service = module.get<AuthEmailsService>(AuthEmailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
