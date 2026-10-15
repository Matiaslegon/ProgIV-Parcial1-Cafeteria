import { NuevoPedido } from '../../src/models/Pedido';
import { PedidoRepository } from '../../src/repositories/PedidoRepository';
import { ProductoRepository } from '../../src/repositories/ProductoRepository';
import { PedidoService } from '../../src/services/PedidoService';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Pedido Service', () => {
  let service: PedidoService;
  let productoRepo: ProductoRepository;
  let pedidoRepo: PedidoRepository;
  const nuevoPedido: NuevoPedido = {
    items: [
      { productoId: 2, cantidad: 3 },
      { productoId: 5, cantidad: 2 },
    ],
  };
  beforeEach(() => {
    productoRepo = new ProductoRepository();
    pedidoRepo = new PedidoRepository();
    service = new PedidoService(pedidoRepo, productoRepo);
  });

  it('crea un nuevo pedido que incluye el total del mismo', () => {
    const nuevo = service.crear(nuevoPedido);

    expect(nuevo.id).toBe(1);
    expect(nuevo.estado).toBe('pendiente');
    expect(nuevo.items).toHaveLength(2);
    expect(nuevo.total).toBeDefined();
  });

  it('agrega a la lista un nuevo pedido creado', () => {
    const nuevo = service.crear(nuevoPedido);
    const pedidos = service.obtenerTodos();

    expect(pedidos).toHaveLength(1);
    expect(pedidos).toContainEqual(nuevo);
  });

  it('obtiene el detalle de un nuevo pedido creado', () => {
    const nuevo = service.crear(nuevoPedido);
    const pedido = service.obtenerPorId(1);

    expect(pedido).toBeDefined();
    expect(pedido).toEqual(nuevo);
  });

  it('obtener el detalle de un pedido inexistente retorna "undefined"', () => {
    const pedido = service.obtenerPorId(999);
    expect(pedido).not.toBeDefined();
  });
});
