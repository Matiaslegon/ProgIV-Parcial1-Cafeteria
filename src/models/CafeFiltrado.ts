import {
  GRAMOS_POR_TAMANO_FILTRADO,
  PRECIO_BASE_FILTRADO,
  tamanoCafe,
  variedadCafe,
} from '../config/catalogo';
import { Cafe } from './Cafe';

export class CafeFiltrado extends Cafe {
  constructor(id: number, tamano: tamanoCafe, variedad: variedadCafe) {
    super(
      id,
      `Filtrado ${tamano} ${variedad}`,
      'filtrado',
      PRECIO_BASE_FILTRADO,
      tamano,
      variedad,
      GRAMOS_POR_TAMANO_FILTRADO[tamano],
    );
  }
}
