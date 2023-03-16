/* eslint-disable no-console */
'use strict';

const http = require('http');

const BASE_URL = 'http://localhost:5700';
const params = process.argv.slice(2);

const href = `${BASE_URL}${params[0]}`;

const request = http.request(
  href,
  (res) => {
    res.setEncoding('utf8');

    res.on('data', (data) => {
      console.log(data, 'DATA');
    });
  },
);

request.on('error', (err) => {
  console.log(err, 'ERROR');
});

request.end();
