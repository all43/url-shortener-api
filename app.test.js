const request = require('supertest');
process.env.PORT = 3337;
const { app, server } = require('./app');

describe('API functions properly', () => {

  afterAll((done) => {
    server.close(done);
  });

  it('responds with json', () => {
    return request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('responds with error to invalid url', () => {
    return response = request(app)
    .post('/api/urls')
    .send({ url: 'Scooby-Doo' })
    .expect(400);
  });

  it('creates short url', async () => {
    const response = await request(app)
      .post('/api/urls')
      .send({ url: 'https://google.com/' });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('key');
  })
});
