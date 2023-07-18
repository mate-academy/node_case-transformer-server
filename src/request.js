/* eslint-disable no-console */
//! That file just for tests

const http = require('http');

const BASE = 'http://localhost:5700';
const pathname = '/CreateServer';
const search = '?toCase=SNAKE';
const href = BASE + pathname + search;

console.log(href);

const req = http.request(href, (res) => {
  res.setEncoding('utf8');

  console.log({ status: res.statusCode });

  res.on('data', (data) => {
    console.log(data);
  });
});

req.end();
