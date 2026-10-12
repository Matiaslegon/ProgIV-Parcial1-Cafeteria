import { Producto } from './Producto';

export type EstadoPedido = 'pendiente' | 'entregado' | 'cancelado';

interface PedidoItem {
  productoId: number;
  cantidad: number;
}

export interface NuevoPedido {
  items: PedidoItem[];
  estado?: EstadoPedido;
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

  calcularTotal(obtenerPrecio: (productoId: number) => number): number {
    return this.items.reduce(
      (total, item) => total + obtenerPrecio(item.productoId) * item.cantidad,
      0,
    );
  }

  toJSON(): object {
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
