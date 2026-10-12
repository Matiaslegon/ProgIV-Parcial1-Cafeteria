export type tipoProducto = 'espresso' | 'filtrado' | 'pasteleria';
export type tamanoCafe = 'pocillo' | 'mediano' | 'taza_grande';
export type variedadCafe = 'etiopia' | 'colombia' | 'brasil';
export type variedadPasteleria = 'muffin_chocolate' | 'torta_selva_negra';

export const PRECIO_POR_GRAMO: Record<variedadCafe, number> = {
  brasil: 140,
  colombia: 180,
  etiopia: 240,
} as const;

export const PRECIO_BASE_ESPRESSO = 2500;
export const PRECIO_BASE_FILTRADO = 3200;

export const GRAMOS_POR_TAMANO_ESPRESSO: Record<tamanoCafe, number> = {
  pocillo: 18,
  mediano: 27,
  taza_grande: 36,
} as const;

export const GRAMOS_POR_TAMANO_FILTRADO: Record<tamanoCafe, number> = {
  pocillo: 6,
  mediano: 15,
  taza_grande: 25,
} as const;

export const PRECIO_POR_VARIEDAD_PASTELERIA: Record<variedadPasteleria, number> = {
  muffin_chocolate: 2500,
  torta_selva_negra: 4200,
} as const;
