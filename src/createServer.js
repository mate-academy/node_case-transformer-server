/* eslint-disable max-len */

const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase.js');
const { checkErrors } = require('./checkErrors.js');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const params = new URLSearchParams(normalizedUrl);
    const caseName = params.get('toCase');

    const isErrors = checkErrors(textToConvert, caseName);

    if (isErrors.length > 0) {
      res.statusCode(400);
      res.statusMessage = 'Bad request';

      res.end(
        JSON.stringify({
          errors: isErrors,
        }),
      );

      return;
    }

    const convertedObj = convertToCase(textToConvert, caseName);

    /*
    {
      originalCase: 'CASE_NAME',
      convertedText: 'CONVERTED_TEXT',
    }
    */

    const { originalCase, convertedText } = convertedObj;

    const result = {
      originalCase,
      targetCase: caseName,
      originalText: textToConvert,
      convertedText,
    };

    /*
    {
      "originalCase": "KEBAB",
      "targetCase": "PASCAL",
      "originalText": "hello-world",
      "convertedText": "HelloWorld"
    }
    */

    res.statusCode(200);
    res.statusMessage = 'OK';
    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = {
  createServer,
};
