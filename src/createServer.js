const http = require('http');
const { convertToCase } = require('./convertToCase');
const { isValidReq } = require('./isValidRequest');

function createServer() {
  const server = http.createServer((req, res) => {
    const text = req.url.split('?')[0].replace('/', '');
    const search = req.url.split('?')[1].split('=');
    const [searchName, searchParam] = search;

    const { error, message } = isValidReq(text, searchName, searchParam);

    const contentRes = !error
      ? convertToCase(text, searchParam)
      : { errors: [{ message }] };

    res.end(JSON.stringify(contentRes));
  });

  return server;
}

module.exports = {
  createServer,
};
