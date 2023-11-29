const http = require('http');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    res.write('<h1>Hello, world!</h1>');
    res.end('the last portion of data');
  });

  return server;
};

module.exports = {
  createServer,
};
