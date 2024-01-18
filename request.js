const http = require('http');

const URL_BASE = 'http://localhost:5700';
const href = `${URL_BASE}/jsonStringified?toCase=PASCAL1`;

const req = http.request(href, (res) => {
  res.setEncoding('utf8');
  console.log('statusCode:', res.statusCode);

  res.on('data', console.log);
  req.on('error', console.warn);
});

req.end();
