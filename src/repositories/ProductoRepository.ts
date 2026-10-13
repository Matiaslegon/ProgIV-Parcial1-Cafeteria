import catalogoProductos from "../../data/productos.json" with { type: "json" };
import {
  tamanoCafe,
  variedadCafe,
  variedadPasteleria,
} from "../config/catalogo";
import { CafeEspresso } from "../models/CafeEspresso";
import { CafeFiltrado } from "../models/CafeFiltrado";
import { Pasteleria } from "../models/Pasteleria";
import { Producto } from "../models/Producto";

type ProductoCatalogo =
  | { id: number; tipo: "espresso"; tamano: tamanoCafe; variedad: variedadCafe }
  | { id: number; tipo: "filtrado"; tamano: tamanoCafe; variedad: variedadCafe }
  | { id: number; tipo: "pasteleria"; variedad: variedadPasteleria };

export interface IProductoRepository {
  obtenerTodos(): Producto[];
  obtenerPorId(id: number): Producto | undefined;
}

export class ProductoRepository implements IProductoRepository {
  private productos: Producto[] = (catalogoProductos as ProductoCatalogo[]).map(
    (producto) => {
      switch (producto.tipo) {
        case "espresso":
          return new CafeEspresso(
            producto.id,
            producto.tamano,
            producto.variedad,
          );
        case "filtrado":
          return new CafeFiltrado(
            producto.id,
            producto.tamano,
            producto.variedad,
          );
        case "pasteleria":
          return new Pasteleria(producto.id, producto.variedad);
      }
    },
  );

  obtenerTodos(): Producto[] {
    return [...this.productos];
  }

  obtenerPorId(id: number): Producto | undefined {
    return this.productos.find((producto) => producto.getId() === id);
  }
}
