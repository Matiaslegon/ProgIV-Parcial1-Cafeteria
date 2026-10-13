export type EstadoPedido = 'pendiente' | 'entregado' | 'cancelado';

interface ProductoConPrecio {
  calcularPrecio(): number;
}

type BuscarProducto = (id: number) => ProductoConPrecio;

interface PedidoItem {
  productoId: number;
  cantidad: number;
}

export interface NuevoPedido {
  items: PedidoItem[];
  estado?: EstadoPedido;
}

export interface PedidoJSON {
  id: number;
  items: PedidoItem[];
  estado: EstadoPedido;
}

export class Pedido {
  private id: number;
  private items: PedidoItem[];
  private estado: EstadoPedido;

  constructor(id: number, items: PedidoItem[], estado: EstadoPedido = 'pendiente') {
    this.id = id;
    this.items = items;
    this.estado = estado;
  }

  cambiarEstado(nuevoEstado: EstadoPedido): void {
    this.estado = nuevoEstado;
  }

  calcularTotal(buscar: BuscarProducto): number {
    return this.items.reduce(
      (total, item) => total + buscar(item.productoId).calcularPrecio() * item.cantidad,
      0,
    );
  }

  toJSON(): PedidoJSON {
    return {
      id: this.id,
      items: this.items,
      estado: this.estado,
    };
  }

  getId(): number {
    return this.id;
  }

  getItems(): PedidoItem[] {
    return this.items;
  }

  getEstado(): EstadoPedido {
    return this.estado;
  }
}
