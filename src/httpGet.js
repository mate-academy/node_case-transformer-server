/* eslint-disable no-console */
const http = require('http');

const PORT = process.env.PORT || 5700;

http.get(`http://localhost:${PORT}/fdgh-dfsg?toCase=KEBA`, (res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => console.log(JSON.parse(data)));
  // res.on('data', console.log);
});
