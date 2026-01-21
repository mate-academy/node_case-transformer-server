const http = require('http');
const { getDataFromUrl } = require('./getDataFromUrl');
const { validateData } = require('./validateData');
const { getResult } = require('./getResult');

const createServer = () => {
  return http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { textForTransform, toCase } = getDataFromUrl(req.url);
    const errors = validateData(textForTransform, toCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));
    } else {
      const result = getResult(textForTransform, toCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(result));
    }
  });
};

module.exports = {
  createServer,
};
