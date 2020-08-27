const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000;

// MySQL connection
const db = require('./config/db')

// Middlewares
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

app.post('/assets/upload', (req, res) => {
  db.query('INSERT INTO assets SET organization_id = ?, watermark = ?, background_image = ?, asset = ?',
    [req.body.organization_id, req.body.watermark, req.body.background_image, req.body.asset],
   function (error, results, fields) {
    if (error) {
      console.error(error);
      res.status(400).send();
      throw error;
    }
    console.log(results);
    res.status(200).send('Assets uploaded!');
  });
});

app.get('/assets/{oragnization_id}', (req, res) => {

  db.query('SELECT asset from assets where organization_id = ?', req.params.organization_id, 
  function (error, results, fields) {
    if (error) {
      console.error(error);
      res.status(400).send();
      throw error;
    }
    console.log(results);
    res.status(200).send(results);
  });
})