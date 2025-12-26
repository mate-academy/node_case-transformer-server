const http = require('http');

const BASE = 'http://localhost:5700';
const param = '?toCase=LOWER';

const href = BASE + param;

const req = http.get(href, (res) => {
  res.setEncoding('utf8');

  res.on('data', (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  });

  res.on('error', (error) => {
    // eslint-disable-next-line no-console
    console.error('Request error:', error);
  });
});

req.end();
