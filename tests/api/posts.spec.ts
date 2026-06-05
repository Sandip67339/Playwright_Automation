import { test, expect } from '@playwright/test';

const API_BASE = 'https://jsonplaceholder.typicode.com';

test.describe('Posts API Tests (JSONPlaceholder)', () => {
  test('GET /posts - should return list of posts', async ({ request }) => {
    const response = await request.get(`${API_BASE}/posts`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    // Validate post schema
    const post = body[0];
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
  });

  test('GET /posts/:id - should return a single post', async ({ request }) => {
    const response = await request.get(`${API_BASE}/posts/1`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
    expect(body).toHaveProperty('userId');
  });

  test('POST /posts - should create a new post', async ({ request }) => {
    const newPost = {
      title: 'Automation Test',
      body: 'Testing API with Playwright',
      userId: 1,
    };

    const response = await request.post(`${API_BASE}/posts`, {
      data: newPost,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('title', newPost.title);
    expect(body).toHaveProperty('body', newPost.body);
    expect(body).toHaveProperty('userId', newPost.userId);
    expect(body).toHaveProperty('id'); // mock ID is generated
  });

  test('PUT /posts/:id - should update an existing post', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated Body',
      userId: 1,
    };

    const response = await request.put(`${API_BASE}/posts/1`, {
      data: updatedPost,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('title', updatedPost.title);
    expect(body).toHaveProperty('body', updatedPost.body);
    expect(body).toHaveProperty('id', 1);
  });

  test('DELETE /posts/:id - should delete a post', async ({ request }) => {
    const response = await request.delete(`${API_BASE}/posts/1`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200); // JSONPlaceholder returns 200 on DELETE
  });
});
