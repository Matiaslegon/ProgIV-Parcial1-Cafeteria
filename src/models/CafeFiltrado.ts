import { Cafe } from "./Cafe";
import type { tamanoCafe, variedadCafe } from "./Cafe";

export class CafeFiltrado extends Cafe {
  private static readonly PRECIO_BASE = 3200;
  private static readonly GRAMOS_POR_TAMANO: Record<tamanoCafe, number> = {
    pocillo: 6,
    mediano: 15,
    taza_grande: 25,
  }
  constructor(id: number, tamano: tamanoCafe, variedad: variedadCafe) {
    super(id, `Filtrado ${tamano} ${variedad}`, 'filtrado', CafeFiltrado.PRECIO_BASE, tamano, variedad, CafeFiltrado.GRAMOS_POR_TAMANO[tamano]);
  }
}