/* eslint-disable no-console */
const http = require('http');

const BASE = 'http://localhost:3000';
// const pathname = '/hello';
// const search = '?toCase=SNAKE';

const href = BASE + '/?toCase=LOWER';

const req = http.get(href, (res) => {
  res.setEncoding('utf8');

  console.log({
    status: res.statusCode,
  });

  res.on('data', (data) => {
    console.log(data);
  });
});

req.on('error', (error) => {
  console.error(error);
});
