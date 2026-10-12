import { Producto } from "./Producto";
type variedadPasteleria = 'muffin_chocolate' | 'torta_selva_negra';

export class Pasteleria extends Producto {
  private static readonly PRECIO_POR_VARIEDAD: Record<variedadPasteleria, number> = {
    muffin_chocolate: 2500,
    torta_selva_negra: 4200,
  }
  constructor(id: number, variedad: variedadPasteleria) {
    super(id, `Pasteleria ${variedad.replace('_', ' ')}`, 'pasteleria', Pasteleria.PRECIO_POR_VARIEDAD[variedad]);
  }

  calcularPrecio(): number {
    return this.precioBase ;
  }
}