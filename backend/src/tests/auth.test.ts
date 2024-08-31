import request from 'supertest';
import app from '../app';
import { sequelize } from '../models';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        visibleName: 'John Doe',
        username: 'johndoe',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toBe('johndoe');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'johndoe',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'johndoe',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(401);
  });
});

afterAll(async () => {
  await sequelize.close();
});
