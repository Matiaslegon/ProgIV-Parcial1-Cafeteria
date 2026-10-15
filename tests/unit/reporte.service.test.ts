import { describe, it, expect, beforeEach } from 'vitest';
import { ReporteService } from '../../src/services/ReporteService';
import { PedidoRepository } from '../../src/repositories/PedidoRepository';
import { ProductoRepository } from '../../src/repositories/ProductoRepository';

describe('Reporte service', () => {
  let service: ReporteService;
  let pedidoRepository: PedidoRepository;
  let productoRepository: ProductoRepository;

  beforeEach(() => {
    pedidoRepository = new PedidoRepository();
    productoRepository = new ProductoRepository();
    service = new ReporteService(pedidoRepository, productoRepository);
  });

  it('Si no hay pedidos devuelve 0 y undefined el producto más vendido', () => {
    expect(service.obtenerReporte()).toEqual({
      facturacion: 0,
      productoMasVendido: undefined,
    });
  });

  it('calcula la facturación solo de los pedidos entregados', () => {
    pedidoRepository.crear({
      items: [{ productoId: 1, cantidad: 2 }],
      estado: 'entregado',
    });
    pedidoRepository.crear({
      items: [{ productoId: 2, cantidad: 1 },
        {productoId: 1, cantidad: 3},
        {productoId: 3, cantidad: 4}
      ],
      estado: 'entregado',
    });

    pedidoRepository.crear({
      items: [{ productoId: 1, cantidad: 10 }],
      estado: 'cancelado',  });

    expect(service.obtenerReporte().facturacion).toBe(58120);
  });

  it('informa el producto más vendido', () => {
     pedidoRepository.crear({
      items: [{ productoId: 1, cantidad: 2 }],
      estado: 'entregado',
    });
    pedidoRepository.crear({
      items: [{ productoId: 2, cantidad: 1 },
        {productoId: 1, cantidad: 3},
        {productoId: 3, cantidad: 4}
      ],
      estado: 'entregado',
    });

    pedidoRepository.crear({
      items: [{ productoId: 1, cantidad: 10 }],
      estado: 'cancelado',  });

    expect(service.obtenerReporte().productoMasVendido).toBe(1);
  });

  it('devolver el reporte completo', () => {
     pedidoRepository.crear({
      items: [{ productoId: 1, cantidad: 2 }],
      estado: 'entregado',
    });

    pedidoRepository.crear({
      items: [{ productoId: 2, cantidad: 1 },
        {productoId: 1, cantidad: 3},
        {productoId: 3, cantidad: 4}
      ],
      estado: 'entregado',
    });

    pedidoRepository.crear({
      items: [{ productoId: 1, cantidad: 10 }],
      estado: 'cancelado',  });

    expect(service.obtenerReporte()).toEqual({
      facturacion: 58120,
      productoMasVendido: 1,    });
  });
});