import { tipoProducto } from '../config/catalogo';

export abstract class Producto {
  protected id: number;
  protected nombre: string;
  protected tipo: tipoProducto;
  protected precioBase: number;

  constructor(id: number, nombre: string, tipo: tipoProducto, precioBase: number) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.precioBase = precioBase;
  }

  abstract calcularPrecio(): number;

  toJSON(): object {
    return {
      id: this.id,
      nombre: this.nombre,
      tipo: this.tipo,
      precioBase: this.precioBase,
      precioFinal: this.calcularPrecio(),
    };
  }

  getId(): number {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getTipo(): tipoProducto {
    return this.tipo;
  }
}
