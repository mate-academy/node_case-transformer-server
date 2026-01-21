/* eslint-disable no-console */
const http = require('http');

const BASE = 'http://localhost:5700';

const href = BASE
+ '/createServer?toCase=SNAKE';

const req = http.request(href, (res) => {
  res.setEncoding('utf8');
  console.log(res.statusCode);
  res.on('data', console.log);
});

req.on('error', console.warn);

req.end();
