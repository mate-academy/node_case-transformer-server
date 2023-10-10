const http = require('http');

function createServer() {
  const convertToCase = require('./convertToCase/convertToCase').convertToCase;

  const PORT = process.env.PORT || 3000;

  const server = http.createServer((req, res) => {
    // headers should be set before sending data
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    const text = req.url.split('?')[0];
    const queryString = req.url.split('?')[1];
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    // sends a portion of data
    res.write('<h1>Hello, world!</h1>');
    res.write('next portion of data');
    res.write('one more portion of data');
    res.write(convertToCase(text, toCase));

    // finishes the response
    res.end('the last portion of data');
  });

  // enables the server
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = {
  createServer,
};
