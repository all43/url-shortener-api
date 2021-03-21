const express = require('express');
const cors = require('cors');
const Storage = require('./Storage');
const { checkUrl } = require('./helpers');

const storage = new Storage();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json( { msg: 'OK' } );
});

app.get('/api/keys/:key', (req, res) => {
  const { key } = req.params;
  const url = storage.get(key);
  const statusCode = url ? 200 : 404;
  res.status(statusCode).json({ url });
});

app.post('/api/urls', (req, res) => {
  const { url } = req.body;
  if (!checkUrl(url)) {
    res.status(400).end();
  }
  const key = storage.add(url);
  res.status(201).json({ key });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = { app, server };
