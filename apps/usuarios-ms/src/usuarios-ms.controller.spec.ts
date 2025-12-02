import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosMsController } from './usuarios-ms.controller';
import { UsuariosMsService } from './usuarios-ms.service';

describe('UsuariosMsController', () => {
  let usuariosMsController: UsuariosMsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosMsController],
      providers: [UsuariosMsService],
    }).compile();

    usuariosMsController = app.get<UsuariosMsController>(UsuariosMsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(usuariosMsController.getHello()).toBe('Hello World!');
    });
  });
});
