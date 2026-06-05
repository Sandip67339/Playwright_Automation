import { test, expect } from '@playwright/test';

test.describe('Negative API Tests', () => {
  // TC-API-06: 404 Not Found (JSONPlaceholder)
  test('GET /posts/:id - should return 404 for non-existent post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/99999');

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  // TC-API-09: 401 Unauthorized (httpbin.org)
  test('GET /status/401 - should simulate unauthorized API access', async ({ request }) => {
    const response = await request.get('https://httpbin.org/status/401');

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);
  });

  // TC-API-10: 400 Bad Request (httpbin.org)
  test('GET /status/400 - should simulate bad request response', async ({ request }) => {
    const response = await request.get('https://httpbin.org/status/400');

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
  });
});
