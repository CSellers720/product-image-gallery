const express = require('express');
const path = require('path');
const db = require('../db/index.js');
const cors = require('cors');

const app = express();
const port = 3030;

// CORS is only used for Jest testing
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// This API endpoint returns a set of default URLs to populate the carousel
app.get('/gallery/:product_id', (req, res) => {
  const pid = req.params.product_id;
  db.getDefaults(pid)
    .then((galleryUrls) => {
      res.send(galleryUrls);
      res.end();
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/custom/:product_id/:metal/:cut/:carat', (req, res) => {
  const { product_id, metal, cut, carat } = req.params;
  db.getSpecific(product_id, metal, cut, carat)
    .then((urls) => {
      res.send(urls);
      res.end();
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/cost/:product_id/:metal', (req, res) => {
  const { product_id, metal } = req.params;
  db.getCost(product_id, metal)
    .then((cost) => {
      res.send(cost);
      res.end();
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/rating/:product_id', (req, res) => {
  const { product_id } = req.params;
  db.getRating(product_id)
    .then((data) => {
      res.send(data);
      res.end();
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});