const request = require('supertest');
const app = require('../app');
const items = require('../fakeDb');

beforeEach(() => {
  items.length = 0; // clear the array
});

describe('GET /items', () => {
  test('Gets a list of items', async () => {
    const item = { name: "popsicle", price: 1.45 };
    items.push(item);
    const resp = await request(app).get('/items');
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([item]);
  });
});

describe('POST /items', () => {
  test('Creates a new item', async () => {
    const resp = await request(app)
      .post('/items')
      .send({ name: "cheerios", price: 3.40 });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ added: { name: "cheerios", price: 3.40 } });
  });
});

describe('GET /items/:name', () => {
  test('Gets a single item', async () => {
    const item = { name: "popsicle", price: 1.45 };
    items.push(item);
    const resp = await request(app).get(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(item);
  });

  test('Responds with 404 for invalid item', async () => {
    const resp = await request(app).get('/items/notfound');
    expect(resp.statusCode).toBe(404);
  });
});

describe('PATCH /items/:name', () => {
  test('Updates a single item', async () => {
    const item = { name: "popsicle", price: 1.45 };
    items.push(item);
    const resp = await request(app)
      .patch(`/items/${item.name}`)
      .send({ name: "new popsicle", price: 2.45 });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ 
      updated: { name: "new popsicle", price: 2.45 } 
    });
  });
});

describe('DELETE /items/:name', () => {
  test('Deletes a single item', async () => {
    const item = { name: "popsicle", price: 1.45 };
    items.push(item);
    const resp = await request(app).delete(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(items.length).toBe(0);
  });
});