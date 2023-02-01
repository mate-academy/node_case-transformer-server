/* eslint-disable no-console */
const http = require('http');

const BASE = 'http://localhost:8080';

const searchParams = '/afs?toCase=SNAKE';

const href = BASE + searchParams;

const req = http.request(href, res => {
  console.log(res.statusCode);

  res.setEncoding('utf-8');

  res.on('data', (data) => {
    console.log(data);
  });
});

req.on('error', (err) => {
  console.log(err);
});

req.end();
