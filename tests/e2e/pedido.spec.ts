import { test, expect } from '@playwright/test';

test.describe('Pedido E2E', () => {
  test('Crea un pedido y se lista correctamente con total calculado', async ({
    request,
    baseURL,
  }) => {
    const postRes = await request.post(`${baseURL}/pedidos`, {
      data: {
        items: [
          { productoId: 2, cantidad: 1 },
          { productoId: 4, cantidad: 2 },
        ],
      },
    });

    expect(postRes.status()).toBe(201);
    const createdPedido = await postRes.json();
    expect(createdPedido).toHaveProperty('id');
    expect(createdPedido.items).toHaveLength(2);
    expect(createdPedido).toHaveProperty('estado', 'pendiente');
    expect(createdPedido).toHaveProperty('total', 18300);

    const getRes = await request.get(`${baseURL}/pedidos`);
    expect(getRes.status()).toBe(200);
    const pedidos = await getRes.json();
    expect(pedidos).toContainEqual(createdPedido);
  });

  test('Intenta crear un pedido con producto inexistente y recibe error', async ({
    request,
    baseURL,
  }) => {
    const postRes = await request.post(`${baseURL}/pedidos`, {
      data: {
        items: [{ productoId: 999, cantidad: 1 }],
      },
    });

    expect(postRes.status()).toBe(500);
    const errorResponse = await postRes.json();
    expect(errorResponse).toHaveProperty('error');
    expect(errorResponse.error).toContain('No se puede crear un pedido con productos inexistentes');
  });

  test('Crea un pedido y luego obtiene su detalle por ID', async ({ request, baseURL }) => {
    const postRes = await request.post(`${baseURL}/pedidos`, {
      data: {
        items: [{ productoId: 1, cantidad: 3 }],
      },
    });
    const createdPedido = await postRes.json();

    const getRes = await request.get(`${baseURL}/pedidos/${createdPedido.id}`);
    expect(getRes.status()).toBe(200);
    const pedido = await getRes.json();
    expect(pedido).toEqual(createdPedido);
  });
});
