/* eslint-disable no-console */

const http = require('http');

const Base = 'http://localhost:5700';
const pathName = '/hello-world?toCase=PASCAL';

const href = Base + pathName;

const req = http.request(href, (res) => {
  console.log(res.statusCode);

  res.setEncoding('utf-8');

  res.on('data', (data) => {
    console.log(data);
  });
});

req.end();
