import request from 'supertest';
import { createApp } from '../app';
import { todoRepository } from '../repository';

const app = createApp();

beforeEach(() => {
  todoRepository.clear();
});

describe('GET /health', () => {
  it('should return ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /todos', () => {
  it('should return empty array initially', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should return all todos', async () => {
    todoRepository.create({ title: 'Test Todo' });
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});

describe('POST /todos', () => {
  it('should create a todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'My Todo', description: 'Some description' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('My Todo');
    expect(res.body.completed).toBe(false);
    expect(res.body.id).toBeDefined();
  });

  it('should return 400 if title is missing', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.status).toBe(400);
  });

  it('should return 400 if title is empty string', async () => {
    const res = await request(app).post('/todos').send({ title: '  ' });
    expect(res.status).toBe(400);
  });
});

describe('GET /todos/:id', () => {
  it('should return a todo by id', async () => {
    const todo = todoRepository.create({ title: 'Find Me' });
    const res = await request(app).get(`/todos/${todo.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(todo.id);
  });

  it('should return 404 for unknown id', async () => {
    const res = await request(app).get('/todos/non-existent-id');
    expect(res.status).toBe(404);
  });
});

describe('PUT /todos/:id', () => {
  it('should update a todo', async () => {
    const todo = todoRepository.create({ title: 'Old title' });
    const res = await request(app)
      .put(`/todos/${todo.id}`)
      .send({ title: 'New title', completed: true });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('New title');
    expect(res.body.completed).toBe(true);
  });

  it('should return 404 for unknown id', async () => {
    const res = await request(app).put('/todos/nope').send({ title: 'x' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo', async () => {
    const todo = todoRepository.create({ title: 'Delete me' });
    const res = await request(app).delete(`/todos/${todo.id}`);
    expect(res.status).toBe(204);

    const todos = todoRepository.findAll();
    expect(todos).toHaveLength(0);
  });

  it('should return 404 for unknown id', async () => {
    const res = await request(app).delete('/todos/nope');
    expect(res.status).toBe(404);
  });
});
