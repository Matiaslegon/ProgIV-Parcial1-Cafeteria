import { Reporte } from '../models/Reporte';
import { PedidoRepository } from '../repositories/PedidoRepository';
import { ProductoRepository } from '../repositories/ProductoRepository';

export interface ReporteJSON {
  facturacion: number;
  productoMasVendido: number | undefined;
}

interface IReporteService {
  obtenerReporte(): ReporteJSON;
}

export class ReporteService implements IReporteService {
  constructor(
    private pedidos: PedidoRepository,
    private productos: ProductoRepository,
  ) {}

  obtenerReporte(): ReporteJSON {
    const reporte = new Reporte();
    const pedidos = this.pedidos.obtenerTodos();
    const buscar = (id: number) => this.productos.obtenerPorId(id)!;

    const paraFacturacion = pedidos.map((pedido) => ({
      getEstado: () => pedido.getEstado(),
      calcularTotal: (buscarProducto: typeof buscar) =>
        pedido.calcularTotal(buscarProducto),
    }));
    const paraVentas = pedidos.map((pedido) => ({ getItems: () => pedido.getItems(),
    }));

    return {
      facturacion: reporte.calcularFacturacion(paraFacturacion, buscar),
      productoMasVendido: reporte.productoMasVendido(paraVentas),
    };
  }
}
