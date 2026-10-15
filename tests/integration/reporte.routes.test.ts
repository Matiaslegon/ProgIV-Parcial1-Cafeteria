import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { Express } from 'express';
import { crearApp } from '../../src/app';

describe('Rutas reporte', () => {
  let app: Express;

  beforeEach(async () => {
    app = crearApp();

    await request(app).post('/pedidos').send({ items: [{ 
        productoId: 1, cantidad: 2 }], 
        estado: 'entregado' });

    await request(app).post('/pedidos').send({
      items: [
        { productoId: 2, cantidad: 1 },
        { productoId: 1, cantidad: 3 },
        { productoId: 3, cantidad: 4 },
      ],
      estado: 'entregado'});


    await request(app).post('/pedidos').send({
        items: [{ productoId: 1, cantidad: 10 }], 
        estado: 'cancelado' });
  });

  it('GET /reportes devuelve facturación y producto más vendido', async () => {
    const res = await request(app).get('/reportes');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ facturacion: 58120, productoMasVendido: 1 });
  });
});