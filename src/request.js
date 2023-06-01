// this file was created only for development
// if you mentor just skip this file
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5700,
  path: '/?toCasefffsf=hljh',
};

http.get(options, (res) => {
  res.setEncoding('utf-8');
  // eslint-disable-next-line no-console
  res.on('data', console.log);
});
