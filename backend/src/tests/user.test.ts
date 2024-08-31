import request from 'supertest';
import app from '../app';
import { sequelize } from '../models';

let token: string;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Register and log in a user to get a token
  await request(app).post('/auth/register').send({
    visibleName: 'John Doe',
    username: 'johndoe',
    password: 'password123',
  });

  const res = await request(app).post('/auth/login').send({
    username: 'johndoe',
    password: 'password123',
  });

  token = res.body.token;
});

describe('User Endpoints', () => {
  it('should get logged in user details', async () => {
    const res = await request(app)
      .get('/user/me')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toBe('johndoe');
  });

  it('should update logged in user', async () => {
    const res = await request(app)
      .patch('/user/me')
      .set('Authorization', token)
      .send({
        visibleName: 'Johnathan Doe',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.visibleName).toBe('Johnathan Doe');
});

  it('should delete logged in user', async () => {
    const res = await request(app)
      .delete('/user/me')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(204);
  });

  it('should not get user details after deletion', async () => {
    const res = await request(app)
      .get('/user/me')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(401);
  });
});

afterAll(async () => {
  await sequelize.close();
});
