import request from 'supertest';
import app from '../app';
import { sequelize } from '../models';

let token: string;
let postId: number;

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

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', token)
      .send({
        content: 'This is my first post!',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.content).toBe('This is my first post!');
    postId = res.body.id;
  });

  it('should update the post', async () => {
    const res = await request(app)
      .patch(`/posts/${postId}`)
      .set('Authorization', token)
      .send({
        content: 'This is my updated post!',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.content).toBe('This is my updated post!');
});

  it('should delete the post', async () => {
    const res = await request(app)
      .delete(`/posts/${postId}`)
      .set('Authorization', token);
    expect(res.statusCode).toEqual(204);
  });

  it('should not find the deleted post', async () => {
    const res = await request(app)
      .get(`/posts/${postId}`)
      .set('Authorization', token);
    expect(res.statusCode).toEqual(404);
  });

  it('should get the last 100 posts', async () => {
    // Create a few posts
    await request(app)
      .post('/posts')
      .set('Authorization', token)
      .send({ content: 'Post 1' });

    await request(app)
      .post('/posts')
      .set('Authorization', token)
      .send({ content: 'Post 2' });

    const res = await request(app)
      .get('/posts/recent')
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeLessThanOrEqual(100);
  });
});

afterAll(async () => {
  await sequelize.close();
});
