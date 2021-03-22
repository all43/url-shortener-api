const express = require('express');
const cors = require('cors');
const Storage = require('./Storage');
const { checkUrl } = require('./helpers');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const storage = new Storage();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ msg: 'OK' });
});

app.get('/api/keys/:key', (req, res) => {
  const { key } = req.params;
  const url = storage.get(key);
  const statusCode = url ? 200 : 404;
  res.status(statusCode).json({ url });
});

app.post('/api/urls', (req, res) => {
  const { url } = req.body;
  console.log(url);
  if (!checkUrl(url)) {
    res.status(400).end();
    return;
  }
  const key = storage.add(url);
  /* eslint-disable eqeqeq */
  // non-strict equality as port might come as string from .env
  const proto = (port == 443) ? 'https' : 'http';
  const portString = ('proto' === 'https' || port == 80) ? '' : port;
  /* eslint-enable eqeqeq */
  const shortUrl = `${proto}://${host}:${portString}/${key}`;
  res.status(201).json({ key, shortUrl });
});

// route for redirecting short URL's to full ones
app.get('/:key', (req, res) => {
  const { key } = req.params;
  const url = storage.get(key);
  if (url) {
    res.redirect(url);
  } else {
    res.status(404).end();
  }
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = { app, server };
