import { Producto } from "./Producto";

export type tamanoCafe = 'pocillo' | 'mediano' | 'taza_grande';
export type variedadCafe = 'etiopia' | 'colombia' | 'brasil';

export abstract class Cafe extends Producto {
  protected tamano: tamanoCafe;
  protected variedad: variedadCafe;
  protected gramos: number;
  protected static readonly PRECIO_POR_GRAMO: Record<variedadCafe, number> = {
    brasil: 140,
    colombia: 180,
    etiopia: 240,
  }

  constructor(id: number, nombre: string, tipo: 'espresso' | 'filtrado', precioBase: number, tamano: tamanoCafe, variedad: variedadCafe, gramos: number) {
    super(id, nombre, tipo, precioBase);
    this.tamano = tamano;
    this.variedad = variedad;
    this.gramos = gramos;
  }

  calcularPrecio(): number {
    return this.precioBase + (this.gramos * Cafe.PRECIO_POR_GRAMO[this.variedad]);
  }
}