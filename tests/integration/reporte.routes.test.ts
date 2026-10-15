import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { Express } from 'express';
import { crearApp } from '../../src/app';
import { PedidoRepository } from '../../src/repositories/PedidoRepository';
import { ProductoRepository } from '../../src/repositories/ProductoRepository';

describe('Rutas reporte', () => {
  let app: Express;
  let pedidoRepository: PedidoRepository;
  let productoRepository: ProductoRepository;

  beforeEach(() => {
    pedidoRepository = new PedidoRepository();
    productoRepository = new ProductoRepository();

    pedidoRepository.crear({
      items: [{ productoId: 1, cantidad: 2 }],
      estado: 'entregado',
    });
    pedidoRepository.crear({
      items: [
        { productoId: 2, cantidad: 1 },
        { productoId: 1, cantidad: 3 },
        { productoId: 3, cantidad: 4 },
      ],
      estado: 'entregado',
    });
    pedidoRepository.crear({
      items: [{ productoId: 1, cantidad: 10 }],
      estado: 'cancelado',
    });

    app = crearApp();
  });

  it('GET /reportes devuelve facturación y producto más vendido', async () => {
    const res = await request(app).get('/reportes');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ productoMasVendido: 1});
  });
});