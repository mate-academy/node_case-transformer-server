/* eslint-disable no-console */
const http = require('http');

const BASE = 'http://localhost:5700';

const href = BASE + '/hello-world?toCase=CAMEL';

const request = http.request(href, (res) => {
  console.log(res);
});

request.end();
