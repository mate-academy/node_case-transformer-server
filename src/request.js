/* eslint-disable no-console */
const http = require('http');

const request = http
  .request('http://localhost:5700/FUck_mefkg45?toCase=Snake', (res) => {
    console.log(res.statusCode);
  });

request.on('error', (error) => {
  console.error(`Request error: ${error.message}`);
});

request.end();
