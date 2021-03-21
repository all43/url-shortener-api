const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (_req, res) => {
  res.json({ msg: 'Hello world!' });
});

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server listening on port ${port}`);
});
