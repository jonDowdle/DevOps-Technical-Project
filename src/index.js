/* eslint-disable no-console */
const PORT = process.env.PORT;
const CAT_API_KEY = process.env.CAT_API_KEY;

const express = require('express');
const app = express();

const CatApi = require('./lib/CatApi');
const catApi = new CatApi( CAT_API_KEY )
const CatHistory = require('./lib/CatHistory');

app.get('/cat', (req, res) => {
  catApi.get().then( data => {
    CatHistory.log( data );
    return data;
  }).then( data => {
    res.send(data);
  });
})

app.get('/history', (req, res) => {
  CatHistory.get().then( data => {
    let decodedList = decodeURI(data);
    res.send(JSON.parse(`[${decodedList}]`));
  });
})

app.listen(PORT, () => {
  console.log(`Cat API listening on ${PORT}!`)
})

process.on('unhandledRejection', (reason, p) =>
  console.error('Unhandled Rejection at: Promise ', p, reason)
);
