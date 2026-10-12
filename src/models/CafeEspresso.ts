import { Cafe } from "./Cafe";
import type { tamanoCafe, variedadCafe } from "./Cafe";

export class CafeEspresso extends Cafe {
  private static readonly PRECIO_BASE = 2500;
  private static readonly GRAMOS_POR_TAMANO: Record<tamanoCafe, number> = {
    pocillo: 18,
    mediano: 27,
    taza_grande: 36,
  }
  constructor(id: number, tamano: tamanoCafe, variedad: variedadCafe) {
    super(id, `Espresso ${tamano} ${variedad}`, 'espresso', CafeEspresso.PRECIO_BASE, tamano, variedad, CafeEspresso.GRAMOS_POR_TAMANO[tamano]);
  }
}

const cafeEspresso = new CafeEspresso(1, 'pocillo', 'etiopia');
