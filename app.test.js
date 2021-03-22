const request = require('supertest');

process.env.PORT = 3337;
const { app, server } = require('./app');

describe('API functions properly', () => {
  afterAll((done) => {
    server.close(done);
  });

  it('responds with json', () => request(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200));

  it('responds with error to invalid url', () => request(app)
    .post('/api/urls')
    .send({ url: 'Scooby-Doo' })
    .expect(400));

  it('creates short url', async () => {
    const response = await request(app)
      .post('/api/urls')
      .send({ url: 'https://google.com/' });
    expect(response).toMatchObject({
      statusCode: 201,
      body: {
        key: expect.any(String),
        shortUrl: expect.any(String),
      },
    });
  });

  it('redirects to proper full url', async () => {
    const url = 'https://www.berlin.de/';
    const response = await request(app)
      .post('/api/urls')
      .send({ url });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('key');

    const { shortUrl } = response.body;
    return request(shortUrl)
      .get('')
      .expect(302)
      .expect('Location', url);
  });
});
