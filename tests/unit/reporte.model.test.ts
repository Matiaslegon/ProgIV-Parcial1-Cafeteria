import { expect, it, describe, beforeEach } from 'vitest';
import { Reporte } from '../../src/models/Reporte';
import { Pedido } from '../../src/models/Pedido';

describe('Test Reporte Model', () => {
  let reporte: Reporte;

  const precios: Record<number, number> = { 1: 5020, 2: 5740, 3: 6820, 4: 6280 };
  const buscar = (id: number) => ({ calcularPrecio: () => precios[id] }) as any;

  const pedidoA = new Pedido(1, [
    { productoId: 1, cantidad: 2 }, 
    { productoId: 2, cantidad: 1 }, 
    { productoId: 3, cantidad: 3 }, 
  ], 'entregado'); 

  const pedidoB = new Pedido(2, [
    { productoId: 2, cantidad: 4 }, 
    { productoId: 1, cantidad: 1 },
    { productoId: 4, cantidad: 1 },
  ], 'entregado'); 

  const pedidoCancelado = new Pedido(3, [
    { productoId: 1, cantidad: 10 },
  ], 'cancelado');

  beforeEach(() => {
    reporte = new Reporte();
  });

  describe('calcularFacturacion', () => {
    it('suma solo los pedidos con estado entregados', () => {
      expect(
        reporte.calcularFacturacion([pedidoA, pedidoB, pedidoCancelado], buscar),
      ).toBe(70500);
    });

    it('devuelve 0 si no hay pedidos', () => {
      expect(reporte.calcularFacturacion([], buscar)).toBe(0);
    });
  });

  describe('productoMasVendido', () => {
    it('devuelve el producto con más unidades vendidas', () => {
      expect(reporte.productoMasVendido([pedidoA, pedidoB])).toBe(2);
    });

    it('devuelve undefined si no hay pedidos', () => {
      expect(reporte.productoMasVendido([])).toBeUndefined();
    });
  });
});
