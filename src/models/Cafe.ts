import { tamanoCafe, variedadCafe, PRECIO_POR_GRAMO } from '../config/catalogo';
import { Producto } from './Producto';

export abstract class Cafe extends Producto {
  protected tamano: tamanoCafe;
  protected variedad: variedadCafe;
  protected gramos: number;

  constructor(
    id: number,
    nombre: string,
    tipo: 'espresso' | 'filtrado',
    precioBase: number,
    tamano: tamanoCafe,
    variedad: variedadCafe,
    gramos: number,
  ) {
    super(id, nombre, tipo, precioBase);
    this.tamano = tamano;
    this.variedad = variedad;
    this.gramos = gramos;
  }

  calcularPrecio(): number {
    return this.precioBase + this.gramos * PRECIO_POR_GRAMO[this.variedad];
  }

  toJSON(): object {
    return {
      ...super.toJSON(),
      tamano: this.tamano,
      variedad: this.variedad,
      gramos: this.gramos,
    };
  }
}
