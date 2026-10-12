export type tipoProducto = 'espresso' | 'filtrado' | 'pasteleria';

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
}