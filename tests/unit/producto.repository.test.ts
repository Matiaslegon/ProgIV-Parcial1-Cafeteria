import { beforeEach, describe, expect, it } from "vitest";
import { CafeEspresso } from "../../src/models/CafeEspresso";
import { CafeFiltrado } from "../../src/models/CafeFiltrado";
import { Pasteleria } from "../../src/models/Pasteleria";
import { ProductoRepository } from "../../src/repositories/ProductoRepository";

describe("Producto Repository", () => {
  let productoRepository: ProductoRepository;

  beforeEach(() => {
    productoRepository = new ProductoRepository();
  });

  it("inicializa con todos los productos del catálogo", () => {
    const productos = productoRepository.obtenerTodos();

    expect(productos).toHaveLength(20);
    expect(productos[0]).toBeInstanceOf(CafeEspresso);
    expect(productos[9]).toBeInstanceOf(CafeFiltrado);
    expect(productos[18]).toBeInstanceOf(Pasteleria);
  });

  it("obtiene un producto por su ID", () => {
    const productoEspresso = productoRepository.obtenerPorId(1);
    const productoFiltrado = productoRepository.obtenerPorId(10);
    const productoPasteleria = productoRepository.obtenerPorId(19);

    expect(productoEspresso).toBeInstanceOf(CafeEspresso);
    expect(productoFiltrado).toBeInstanceOf(CafeFiltrado);
    expect(productoPasteleria).toBeInstanceOf(Pasteleria);
  });

  it("retorna undefined si no existe un producto con el ID dado", () => {
    const productoObtenido = productoRepository.obtenerPorId(999);

    expect(productoObtenido).toBeUndefined();
  });

  it("retorna una copia de la lista de productos", () => {
    const productos = productoRepository.obtenerTodos();

    productos.pop();

    expect(productoRepository.obtenerTodos()).toHaveLength(20);
  });
});
