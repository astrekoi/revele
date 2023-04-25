const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/data/gallery.json', (req, res) => {
  res.sendFile(__dirname + '/src/data/gallery.json');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});