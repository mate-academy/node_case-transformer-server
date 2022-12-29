const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const [pathName, queryParams] = req.url.split('?');
    const text = pathName.slice(1);
    const params = new URLSearchParams(queryParams);
    const caseParams = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const toCase = params.get('toCase');

    const errors = [];

    if (text.length === 0) {
      errors.push({
        // eslint-disable-next-line max-len
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        // eslint-disable-next-line max-len
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !caseParams.includes(toCase.toUpperCase())) {
      errors.push({
        // eslint-disable-next-line max-len
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      const errorsResponse = {
        errors,
      };

      res.setHeader('Content-Type', 'application/json');

      res.statusCode = 400;
      res.StatusText = 'Bad Request';

      res.end(JSON.stringify(errorsResponse));

      return;
    }

    const result = convertToCase(text, toCase);

    res.setHeader('Content-Type', 'application/json');

    res.statusCode = 200;

    const formattedResponse = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(formattedResponse));
  });
};

module.exports = { createServer };
