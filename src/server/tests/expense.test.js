import request from 'supertest';
import app from '../index.js';
import { prisma } from '../index.js';

describe('Expense API', () => {
  let token;
  let categoryId;

  beforeAll(async () => {
    // Setup test user and get token
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    token = response.body.token;
  });

  test('should create new expense', async () => {
    const response = await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 100,
        date: new Date().toISOString(),
        categoryId,
        description: 'Test expense'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});