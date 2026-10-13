import { expect, it, describe, beforeEach } from 'vitest';
import { Pedido } from '../../src/models/Pedido';

describe('Pedido Model', () => {
  let pedido: Pedido;
  const items = [
    { productoId: 1, cantidad: 2 },
    { productoId: 2, cantidad: 1 },
  ];

  beforeEach(() => {
    pedido = new Pedido(1, items);
  });

  it('Un pedido se crea correctamente con los items y estado inicial', () => {
    expect(pedido.getId()).toBe(1);
    expect(pedido.getItems()).toBe(items);
    expect(pedido.getEstado()).toBe('pendiente');
  });

  it('Se puede cambiar el estado del pedido', () => {
    pedido.cambiarEstado('entregado');
    expect(pedido.getEstado()).toBe('entregado');
  });

  it('Se puede calcular el total del pedido como precio x cantidad', () => {
    const precios: Record<number, number> = {
      1: 500,
      2: 1000,
    };

    const buscarProducto = (productoId: number) => ({
      calcularPrecio: () => precios[productoId],
    });
    const total = pedido.calcularTotal(buscarProducto);

    expect(total).toBe(2000);
  });
});
