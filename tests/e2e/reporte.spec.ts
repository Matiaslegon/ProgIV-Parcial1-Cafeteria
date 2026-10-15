import { test, expect } from '@playwright/test';

test.describe('Reporte E2E', () => {
  test('crea pedidos y el reporte refleja la facturación y el producto más vendido', async ({
    request,
    baseURL,
  }) => {
    const pedidos = [
      { items: [{ productoId: 1, cantidad: 2 }], estado: 'entregado' },
      
      { items: [
          { productoId: 2, cantidad: 1 },
          { productoId: 1, cantidad: 3 },
          { productoId: 3, cantidad: 4 }], estado: 'entregado',},
      
        { items: [{ productoId: 1, cantidad: 10 }], estado: 'cancelado' },];

    for (const pedido of pedidos) {
      const res = await request.post(`${baseURL}/pedidos`, { data: pedido });
      expect(res.status()).toBe(201);
    }

    const reporteRes = await request.get(`${baseURL}/reportes`);
    expect(reporteRes.status()).toBe(200);
    expect(await reporteRes.json()).toEqual({
      facturacion: 58120,
      productoMasVendido: 1,
    });
  });
});