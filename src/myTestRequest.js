const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5700,
  path: '/createServer?toCase=SNAKE',
};

const request = http.request(options, (res) => {
  let body = '';

  res.setEncoding('utf-8');

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    // eslint-disable-next-line no-console
    console.log(body);
  });
});

request.end();
