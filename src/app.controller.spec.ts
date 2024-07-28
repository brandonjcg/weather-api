import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Unit test controller app', () => {
    it('Should return correct response', () => {
      expect(appController.checkHealth()).toEqual({
        message: expect.any(String),
        error: expect.any(Boolean),
      });
    });
  });
});
