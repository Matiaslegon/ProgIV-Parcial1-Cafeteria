import { describe, expect, it } from 'vitest';

// Ejemplo unitario puro (sin I/O ni servidor).
// Reemplazar por tus utilidades/casos de uso reales.
function sum(a: number, b: number): number {
  return a + b;
}

describe('sum', () => {
  it('suma dos números', () => {
    expect(sum(2, 3)).toBe(5);
  });
});
