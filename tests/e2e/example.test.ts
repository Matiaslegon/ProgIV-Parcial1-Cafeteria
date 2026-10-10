import { expect, test } from '@playwright/test';

test('GET /health responde ok (e2e)', async ({ request, baseURL }) => {
  const res = await request.get(`${baseURL}/health`);

  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ status: 'ok' });
});
