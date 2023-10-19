const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const supprotedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const [pathname, queryString] = request.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const textToConvert = pathname.slice(1, pathname.length).toString();

    const errors = [];
    let err;

    if (!toCase) {
      /* eslint-disable max-len */
      err = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
      errors.push({ message: err });
    }

    if (!textToConvert) {
      /* eslint-disable max-len */
      err = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
      errors.push({ message: err });
    }

    if (
      toCase && !supprotedCases.includes(toCase)
    ) {
      /* eslint-disable max-len */
      err = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';
      errors.push({ message: err });
    }

    if (errors.length > 0) {
      const error = {
        errors,
      };

      response.statusCode = 400;
      response.statusText = 'Bad request';
      response.end(JSON.stringify(error));

      return;
    }

    const convert = convertToCase(textToConvert, toCase);
    const resp = {
      convertedText: convert.convertedText,
      originalCase: convert.originalCase,
      originalText: textToConvert,
      targetCase: toCase,
    };

    response.statusCode = 200;
    response.statusText = 'OK';
    response.end(JSON.stringify(resp));
  });

  return server;
}

module.exports = {
  createServer,
};
