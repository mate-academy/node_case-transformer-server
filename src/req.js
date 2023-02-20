const http = require('http');

const req = http.request('http://localhost:5700/createServer?toCase=SGAKE', (res) => {
  console.log('result', res.statusCode);

  res.on('data', (data) => {
    console.log(data);
  });
});

req.on('error', (error) => {
  console.log(error);
});

req.end();
