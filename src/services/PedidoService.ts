import { PedidoRepository } from '../repositories/PedidoRepository';
import { ProductoRepository } from '../repositories/ProductoRepository';
import { NuevoPedido, Pedido, PedidoJSON } from '../models/Pedido';

interface PedidoConTotal extends PedidoJSON {
  total: number;
}

interface IPedidoService {
  obtenerTodos(): PedidoConTotal[];
  crear(pedido: NuevoPedido): PedidoConTotal;
  obtenerPorId(id: number): PedidoConTotal | undefined;
}

export class PedidoService implements IPedidoService {
  constructor(
    private pedidos: PedidoRepository,
    private productos: ProductoRepository,
  ) {}

  obtenerTodos(): PedidoConTotal[] {
    const pedidos = this.pedidos.obtenerTodos();
    return pedidos.map((p) => this.conTotal(p));
  }

  crear(pedido: NuevoPedido): PedidoConTotal {
    const productosInexistentes = pedido.items.find(
      (prod) => !this.productos.obtenerPorId(prod.productoId),
    );
    if (productosInexistentes)
      throw new Error('No se puede crear un pedido con productos inexistentes');

    const nuevo = this.pedidos.crear(pedido);
    return this.conTotal(nuevo);
  }

  obtenerPorId(id: number): PedidoConTotal | undefined {
    const pedido = this.pedidos.obtenerPorId(id);
    return pedido && this.conTotal(pedido);
  }

  private conTotal(pedido: Pedido): PedidoConTotal {
    const buscar = (id: number) => this.productos.obtenerPorId(id)!;
    return { ...pedido.toJSON(), total: pedido.calcularTotal(buscar) };
  }
}
