import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('GET /health (integración)', () => {
  it('responde 200 con { status: "ok" }', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('responde 404 en ruta desconocida', async () => {
    const res = await request(app).get('/no-existe');

    expect(res.status).toBe(404);
  });
});
