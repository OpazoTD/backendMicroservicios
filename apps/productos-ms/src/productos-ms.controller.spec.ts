import { Test, TestingModule } from '@nestjs/testing';
import { ProductosMsController } from './productos-ms.controller';
import { ProductosMsService } from './productos-ms.service';

describe('ProductosMsController', () => {
  let productosMsController: ProductosMsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductosMsController],
      providers: [ProductosMsService],
    }).compile();

    productosMsController = app.get<ProductosMsController>(ProductosMsController);
  });

  describe('health check', () => {
    it('should return service status', () => {
      expect(productosMsController.healthCheck()).toBe('Productos Microservice is running!');
    });
  });
});
