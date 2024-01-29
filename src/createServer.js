const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const wordToConvert = normalizedUrl.pathname.slice(1);
    const caseToConvert = normalizedUrl.searchParams.get('toCase');
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const isNoWord = !wordToConvert;
    const isNoCase = !caseToConvert;
    const isInvalidCase = !!caseToConvert && !cases.includes(caseToConvert);
    const isError = isNoWord || isNoCase || isInvalidCase;
    let responseData;
    let responseBody;

    res.setHeader('Content-Type', 'application/json');

    if (isError) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      responseData = {
        errors: [],
      };

      if (!wordToConvert) {
        responseData.errors.push({
          message: 'Text to convert is required. Correct request is:'
            + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!caseToConvert) {
        responseData.errors.push({
          message: '"toCase" query param is required. Correct request is:'
            + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!cases.includes(caseToConvert) && caseToConvert) {
        responseData.errors.push({
          message: 'This case is not supported. Available cases:'
            + ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }

      responseBody = JSON.stringify(responseData);

      res.end(responseBody);
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';

      responseData = {
        ...convertToCase(wordToConvert, caseToConvert),
        targetCase: caseToConvert,
        originalText: wordToConvert,
      };

      responseBody = JSON.stringify(responseData);

      res.end(responseBody);
    }
  });
};

module.exports = {
  createServer,
};
