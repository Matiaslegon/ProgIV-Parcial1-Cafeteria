import { variedadPasteleria, PRECIO_POR_VARIEDAD_PASTELERIA } from '../config/catalogo';
import { Producto } from './Producto';

export class Pasteleria extends Producto {
  private variedad: variedadPasteleria;

  constructor(id: number, variedad: variedadPasteleria) {
    super(
      id,
      `Pasteleria ${variedad.replace('_', ' ')}`,
      'pasteleria',
      PRECIO_POR_VARIEDAD_PASTELERIA[variedad],
    );
    this.variedad = variedad;
  }

  calcularPrecio(): number {
    return this.precioBase;
  }

  toJSON(): object {
    return {
      ...super.toJSON(),
      variedad: this.variedad,
    };
  }
}
