/* eslint-disable no-console */
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const BASE = process.env.BASE + process.env.PORT;
const pathname = 'hello-world';
const queryParams = 'CAMEL';

const href = `${BASE}/${pathname}?toCase=${queryParams}`;

const request = http.request(href, (res) => {
  res.on('data', (chunk) => {
    console.log(JSON.parse(chunk.toString()));
  });
});

request.end();
