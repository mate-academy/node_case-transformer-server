/* eslint-disable no-console */
// Example of http call

const http = require('http');

const BASE = 'http://localhost:5700';
const href = BASE + '/' + '?toCase=invalid';

http.get(href, (res) => {
  res.setEncoding('utf8');

  res.on('data', (data) => {
    console.log(data);
  });
});
