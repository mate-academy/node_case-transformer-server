const http = require('http');

const BASE = 'http://localhost:5700';
const blya = 'ZalupaOrka?toCase=KEBAB';

const req = http.request(`${BASE}/${blya}`,
  res => {
    res.setEncoding('utf-8');
    // eslint-disable-next-line no-console
    res.on('data', data => console.log(data));
  });

req.end();
