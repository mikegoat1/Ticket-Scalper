const express = require('express');
const request = require('supertest');

jest.mock('../models', () => ({
  Event: {
    destroy: jest.fn(),
    findAll: jest.fn(),
    findOrCreate: jest.fn(),
  },
}));

const { Event } = require('../models');
const eventRoutes = require('../controllers/api/event-routes');

const buildApp = (session = { logged_in: true, user_id: 42 }) => {
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => {
    req.session = session;
    next();
  });
  app.use('/api/events', eventRoutes);
  return app;
};

describe('event routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('requires authentication before saving events', async () => {
    const app = buildApp({ logged_in: false });

    const response = await request(app).post('/api/events').send({});

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Authentication required' });
    expect(Event.findOrCreate).not.toHaveBeenCalled();
  });

  test('validates required event fields', async () => {
    const app = buildApp();

    const response = await request(app).post('/api/events').send({ name: 'Incomplete' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Missing required fields');
    expect(Event.findOrCreate).not.toHaveBeenCalled();
  });

  test('creates a user-owned event favorite', async () => {
    const app = buildApp();
    Event.findOrCreate.mockResolvedValue([{ id: 7, name: 'Ariana Grande' }, true]);

    const response = await request(app).post('/api/events').send({
      name: 'Ariana Grande',
      venue: 'Crypto.com Arena',
      start_date: '2026-06-14',
      start_time: '8:00 PM',
      ticket_link: 'https://example.com/tickets',
      price_range_min: 125,
      price_range_max: 275,
    });

    expect(response.status).toBe(201);
    expect(Event.findOrCreate).toHaveBeenCalledWith({
      where: {
        user_id: 42,
        ticket_link: 'https://example.com/tickets',
      },
      defaults: expect.objectContaining({
        name: 'Ariana Grande',
        user_id: 42,
      }),
    });
  });

  test('returns 200 when saving a duplicate favorite', async () => {
    const app = buildApp();
    Event.findOrCreate.mockResolvedValue([{ id: 7, name: 'Ariana Grande' }, false]);

    const response = await request(app).post('/api/events').send({
      name: 'Ariana Grande',
      venue: 'Crypto.com Arena',
      start_date: '2026-06-14',
      start_time: '8:00 PM',
      ticket_link: 'https://example.com/tickets',
    });

    expect(response.status).toBe(200);
  });

  test('lists only the current user saved events', async () => {
    const app = buildApp();
    Event.findAll.mockResolvedValue([{ id: 1, user_id: 42 }]);

    const response = await request(app).get('/api/events');

    expect(response.status).toBe(200);
    expect(Event.findAll).toHaveBeenCalledWith({ where: { user_id: 42 } });
  });

  test('deletes only the current user saved event', async () => {
    const app = buildApp();
    Event.destroy.mockResolvedValue(1);

    const response = await request(app).delete('/api/events/9');

    expect(response.status).toBe(204);
    expect(Event.destroy).toHaveBeenCalledWith({
      where: {
        id: '9',
        user_id: 42,
      },
    });
  });

  test('returns 404 when deleting a missing saved event', async () => {
    const app = buildApp();
    Event.destroy.mockResolvedValue(0);

    const response = await request(app).delete('/api/events/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Event not found' });
  });
});
