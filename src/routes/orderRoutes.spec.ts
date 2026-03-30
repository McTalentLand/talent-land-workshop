import request from 'supertest';
import { createApp } from '../app';

describe('Order routes', () => {
  const app = createApp();

  test('POST /orders returns 201', async () => {
    const res = await request(app)
      .post('/orders')
      .send({ customerName: 'Test', lines: [{ itemId: 'bigmac', quantity: 1 }] });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeTruthy();
  });

  test('GET /orders/:id returns 404 for missing', async () => {
    const res = await request(app).get('/orders/not-a-real-id');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
