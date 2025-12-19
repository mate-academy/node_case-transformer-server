/* eslint-disable no-console */

const http = require('node:http');

const options = {
  hostname: 'localhost',
  port: 5700,
  path: '/YO-HO-HO?toCase=SNAKE',
  // path: '/',
  // path: '/?toCase=SNAK',
  // path: '/YO-HO-HO?toCase=SNAK',
  // path: '/?toCase=SNAKE',
  // path: '/?toCas=SNAKE',
};

http.get(options, (res) => {
  res.setEncoding('utf8');
  res.on('data', console.log);
});
