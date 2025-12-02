import { Test, TestingModule } from '@nestjs/testing';
import { FacturasMsController } from './facturas-ms.controller';
import { FacturasMsService } from './facturas-ms.service';

describe('FacturasMsController', () => {
  let facturasMsController: FacturasMsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FacturasMsController],
      providers: [FacturasMsService],
    }).compile();

    facturasMsController = app.get<FacturasMsController>(FacturasMsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(facturasMsController.getHello()).toBe('Hello World!');
    });
  });
});
