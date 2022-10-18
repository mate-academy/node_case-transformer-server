const http = require('http');
const fs = require('fs');

const createServer = () => {
  const server = http.createServer(
    (req, res) => {
      const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

      if (!normalizedURL.startsWith('/file')) {
        res.statusCode = 404;
        res.end('File not found. The file path must starts with "/file/"!');
      }

      const fileName = normalizedURL.pathname.replace('/file', '')
        || 'index.html';

      fs.readFile(`./public${fileName}`, (error, data) => {
        if (!error) {
          res.statusCode = 200;
          res.end(data);
        } else {
          res.statusCode = 404;
          res.end('Page not found :(');
        }
      });
    },
  );

  return server;
};

module.exports = { createServer };
