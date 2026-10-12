import { NuevoPedido } from '../../src/models/Pedido';
import { crearApp } from '../../src/app';
import { Express } from 'express';
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';

describe('Pedido Routes', () => {
  let app: Express;
  const nuevoPedido: NuevoPedido = {
    items: [
      { productoId: 1, cantidad: 2 },
      { productoId: 2, cantidad: 1 },
    ],
  };

  beforeEach(() => {
    app = crearApp();
  });

  it('GET /pedidos inicialmente retorna un array vacio de pedidos', async () => {
    const response = await request(app).get('/pedidos');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /pedidos crea un nuevo pedido y retorna el pedido creado en "pendiente"', async () => {
    const response = await request(app).post('/pedidos').send(nuevoPedido);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.items).toEqual(nuevoPedido.items);
    expect(response.body.estado).toBe('pendiente');
  });

  it('GET /pedidos retorna un array con los pedidos creados', async () => {
    await request(app).post('/pedidos').send(nuevoPedido);
    const response = await request(app).get('/pedidos');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('id', 1);
    expect(response.body[0].items).toEqual(nuevoPedido.items);
    expect(response.body[0].estado).toBe('pendiente');
  });

  it('GET /pedidos/:id retorna el pedido creado', async () => {
    const postResponse = await request(app).post('/pedidos').send(nuevoPedido);
    const pedidoId = postResponse.body.id;
    const response = await request(app).get(`/pedidos/${pedidoId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', pedidoId);
    expect(response.body.items).toEqual(nuevoPedido.items);
    expect(response.body.estado).toBe('pendiente');
  });

  it('GET /pedidos/:id retorna 404 si el pedido no existe', async () => {
    const response = await request(app).get('/pedidos/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Pedido no encontrado' });
  });
});
