import { Pedido, NuevoPedido } from '../models/Pedido';
interface IPedidoRepository {
  obtenerTodos(): Pedido[];
  crear(pedido: NuevoPedido): Pedido;
  obtenerPorId(id: number): Pedido | undefined;
}

export class PedidoRepository implements IPedidoRepository {
  private pedidos: Pedido[] = [];
  private siguienteId: number = 1;

  obtenerTodos(): Pedido[] {
    return [...this.pedidos];
  }

  crear(pedido: NuevoPedido): Pedido {
    const nuevoPedido = new Pedido(this.siguienteId++, pedido.items, pedido.estado);

    this.pedidos.push(nuevoPedido);
    return nuevoPedido;
  }

  obtenerPorId(id: number): Pedido | undefined {
    return this.pedidos.find((pedido) => pedido.getId() === id);
  }
}
