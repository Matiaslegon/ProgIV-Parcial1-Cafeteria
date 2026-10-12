import { beforeEach, describe, expect, it } from 'vitest';
import { PedidoRepository } from '../../src/repositories/PedidoRepository';
import { NuevoPedido } from '../../src/models/Pedido';

describe('Pedido Repository', () => {
  let pedidoRepository: PedidoRepository;

  const nuevoPedido: NuevoPedido = {
    items: [
      { productoId: 1, cantidad: 2 },
      { productoId: 2, cantidad: 1 },
    ],
  };

  beforeEach(() => {
    pedidoRepository = new PedidoRepository();
  });

  it('inicializa con una lista vacía de pedidos', () => {
    const pedidos = pedidoRepository.obtenerTodos();
    expect(pedidos).toEqual([]);
    expect(pedidos).toHaveLength(0);
  });

  it('crea un nuevo pedido y lo agrega a la lista', () => {
    const pedidoCreado = pedidoRepository.crear(nuevoPedido);
    const pedidos = pedidoRepository.obtenerTodos();

    expect(pedidos).toHaveLength(1);
    expect(pedidoCreado.getId()).toBe(1);
    expect(pedidoCreado.getItems()).toEqual(nuevoPedido.items);
    expect(pedidoCreado.getEstado()).toBe('pendiente');
  });

  it('obtiene un pedido por su ID', () => {
    const pedidoCreado = pedidoRepository.crear(nuevoPedido);
    const pedidoObtenido = pedidoRepository.obtenerPorId(pedidoCreado.getId());

    expect(pedidoObtenido).toBeDefined();
    expect(pedidoObtenido?.getId()).toBe(pedidoCreado.getId());
    expect(pedidoObtenido?.getItems()).toEqual(nuevoPedido.items);
  });

  it('retorna undefined si no existe un pedido con el ID dado', () => {
    const pedidoObtenido = pedidoRepository.obtenerPorId(999);
    expect(pedidoObtenido).toBeUndefined();
  });
});
