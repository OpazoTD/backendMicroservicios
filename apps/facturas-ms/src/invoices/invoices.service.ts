import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  // Obtener todas las facturas
  async findAll() {
    return this.prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Crear una nueva factura
  async create(invoiceData: any) {
    return this.prisma.invoice.create({
      data: {
        userId: String(invoiceData.userId),
        totalAmount: invoiceData.total,
        status: 'COMPLETED',
        items: invoiceData.items.map((item: any) => ({
          productId: item.productId,
          productName: item.productName || item.name || 'Producto',
          quantity: item.quantity,
          priceAtPurchase: item.price,
        })),
      },
    });
  }
}