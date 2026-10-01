/* eslint-disable no-console */
const http = require('node:http');

const path = 'http://localhost:5700/createServer?toCase=SNAKE';

const request = http.request(path, (response) => {
  response.on('data', (data) => {
    console.log(response.statusCode);
    console.log(response.statusMessage);
    console.log(response.headers);
    console.log(JSON.parse(data.toString('utf-8')));
  });
});

request.end();
