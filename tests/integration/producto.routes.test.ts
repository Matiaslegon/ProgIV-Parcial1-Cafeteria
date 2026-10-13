import { Express } from "express";
import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { crearApp } from "../../src/app";

describe("Producto Routes", () => {
  let app: Express;

  beforeEach(() => {
    app = crearApp();
  });

  it("GET /productos retorna la lista de todos los productos", async () => {
    const response = await request(app).get("/productos");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(20);
    expect(response.body[0]).toMatchObject({ id: 1, tipo: "espresso" });
  });

  it("GET /productos/:id retorna el producto solicitado", async () => {
    const response = await request(app).get("/productos/19");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: 19, tipo: "pasteleria" });
  });

  it("GET /productos/:id retorna 404 si el producto no existe", async () => {
    const response = await request(app).get("/productos/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Producto 999 no encontrado" });
  });

  it("GET /productos/:id retorna 400 si el id no es válido", async () => {
    const response = await request(app).get("/productos/abc");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "El id debe ser un entero positivo",
    });
  });
});
