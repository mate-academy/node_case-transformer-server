const http = require('http');
const { getDataFromUrl } = require('./getDataFromUrl');
const { getResult } = require('./getResult');

const createServer = () => {
  return http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { textForTransform, toCase } = getDataFromUrl(req);
    const { errors, resultOfTransform } = getResult(textForTransform, toCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify(resultOfTransform));
    }
  });
};

module.exports = {
  createServer,
};
