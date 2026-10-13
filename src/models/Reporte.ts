import { Pedido, BuscarProducto } from "./Pedido";
import { Producto } from "./Producto";

interface TotalPedido {
    calcularTotal(buscar: BuscarProducto): number;
}

interface PedidoItems {
    items: ReadonlyArray<{ productoId: number; cantidad: number }>;
}

export class Reporte {
    private facturacion: number = 0;

    calcularFacturacion(pedidos: TotalPedido[], buscar: BuscarProducto): number {
        this.facturacion = pedidos.reduce(
            (suma, pedido) => suma + pedido.calcularTotal(buscar),
            0,
        );
        return this.facturacion;
    }

    productoMasVendido(pedidos: PedidoItems[], buscar:BuscarProducto): number | undefined {
        const ventas = new Map<number, number>();
        for (const pedido of pedidos) {
            for (const item of pedido.items) {
                ventas.set(
                    item.productoId,
                    (ventas.get(item.productoId) ?? 0) + item.cantidad,
                );
            }
        }

        let masVendido: number | undefined;
        let maximo = 0;

        for (const [productoId, cantidad] of ventas) {
            if (cantidad > maximo) {
                maximo = cantidad;
                masVendido = productoId;
            }
        }

        if (masVendido === undefined) {return undefined;}
                return masVendido;
    }
}