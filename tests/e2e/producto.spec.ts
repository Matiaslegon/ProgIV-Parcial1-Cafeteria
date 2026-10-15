import { expect, test } from "@playwright/test";

test("GET /productos devuelve todos los productos", async ({ request }) => {
  const response = await request.get("/productos");
  const productos = await response.json();

  expect(response.status()).toBe(200);
  expect(productos).toHaveLength(20);
  expect(productos[0]).toMatchObject({ id: 1, tipo: "espresso" });
});

test("GET /productos/:id devuelve el producto solicitado", async ({
  request,
}) => {
  const response = await request.get("/productos/19");
  const producto = await response.json();

  expect(response.status()).toBe(200);
  expect(producto).toMatchObject({ id: 19, tipo: "pasteleria" });
});

test("GET /productos/:id devuelve 404 si el producto no existe", async ({
  request,
}) => {
  const response = await request.get("/productos/999");

  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({
    error: "Producto 999 no encontrado",
  });
});

test("GET /productos/:id devuelve 400 si el id no es válido", async ({
  request,
}) => {
  const response = await request.get("/productos/abc");

  expect(response.status()).toBe(400);
  expect(await response.json()).toEqual({
    error: "El id debe ser un entero positivo",
  });
});
