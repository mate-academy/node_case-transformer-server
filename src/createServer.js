const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { cases } = require('./helpers/constants');
const { getErrorResponseBody } = require('./helpers/common');
const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const wordToConvert = normalizedUrl.pathname.slice(1);
    const caseToConvert = normalizedUrl.searchParams.get('toCase');
    const isNoWord = !wordToConvert;
    const isNoCase = !caseToConvert;
    const isInvalidCase = !!caseToConvert && !cases.includes(caseToConvert);
    const isError = isNoWord || isNoCase || isInvalidCase;
    let responseData;

    res.setHeader('Content-Type', 'application/json');

    if (isError) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      responseData = getErrorResponseBody(isNoWord, isNoCase, isInvalidCase);
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';

      responseData = {
        ...convertToCase(wordToConvert, caseToConvert),
        targetCase: caseToConvert,
        originalText: wordToConvert,
      };
    }

    const responseBody = JSON.stringify(responseData);

    res.end(responseBody);
  });
};

module.exports = {
  createServer,
};
