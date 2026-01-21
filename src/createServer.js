const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');

const TEXT_ERROR = `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;
const PARAM_ERROR = `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;
const PARAM_TYPE_ERROR = `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`;
const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = decodeURIComponent(url.pathname.slice(1)) || '';
    const param = url.searchParams.get('toCase') || '';

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: TEXT_ERROR,
      });
    }

    if (!param) {
      errors.push({
        message: PARAM_ERROR,
      });
    } else if (!CASES.includes(param)) {
      errors.push({
        message: PARAM_TYPE_ERROR,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(textToConvert, param);

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: param,
        originalText: textToConvert,
        convertedText: convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
