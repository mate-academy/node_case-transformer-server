const http = require('node:http');
const queryParamsValidation = require('./queryParamsValidation');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const splitParams = req.url.split('?');
    const wordToConvert = splitParams[0].split('/')[1];
    const params = new URLSearchParams(splitParams[1]);
    const toCase = params.get('toCase');

    const errors = queryParamsValidation(wordToConvert, toCase);

    res.setHeader('content-type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ errors }));
    }

    const { originalCase, convertedText } = convertToCase(
      wordToConvert,
      toCase,
    );

    const payload = {
      originalCase,
      targetCase: toCase,
      convertedText,
      originalText: wordToConvert,
    };

    // eslint-disable-next-line no-console
    console.log(payload);
    res.statusCode = 200;

    return res.end(JSON.stringify(payload));
  });
}

module.exports = {
  createServer,
};
