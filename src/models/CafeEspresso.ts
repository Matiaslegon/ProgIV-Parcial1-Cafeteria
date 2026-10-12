import {
  tamanoCafe,
  variedadCafe,
  PRECIO_BASE_ESPRESSO,
  GRAMOS_POR_TAMANO_ESPRESSO,
} from '../config/catalogo';
import { Cafe } from './Cafe';

export class CafeEspresso extends Cafe {
  constructor(id: number, tamano: tamanoCafe, variedad: variedadCafe) {
    super(
      id,
      `Espresso ${tamano} ${variedad}`,
      'espresso',
      PRECIO_BASE_ESPRESSO,
      tamano,
      variedad,
      GRAMOS_POR_TAMANO_ESPRESSO[tamano],
    );
  }
}

const cafeEspresso = new CafeEspresso(1, 'pocillo', 'etiopia');
