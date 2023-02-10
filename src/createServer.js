const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = normalizedUrl;

    const originalText = pathname.slice(1);
    const caseParams = searchParams.toString().split('=');
    const targetCase = caseParams[1];
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const trueReq = '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>';
    const errorsArr = [];

    const errors = {
      textIsMissing: { message: 'Text to convert is required. Correct request'
      + ` is: "${trueReq}".` },
      toCaseIsMissing: { message: '"toCase" query param is required. Correct'
      + ` request is: "${trueReq}".` },
      toCaseIsWrong: { message: 'This case is not supported. Available cases: '
      + `${cases.join(', ')} + '.'` },
    };

    if (!originalText) {
      errorsArr.push(errors.textIsMissing);
    };

    if (caseParams[0] !== 'toCase') {
      errorsArr.push(errors.toCaseIsMissing);
    } else if (!cases.includes(targetCase)) {
      errorsArr.push(errors.toCaseIsWrong);
    };

    if (errorsArr.length) {
      res.statusCode = 404;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errorsArr }));

      return;
    };

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        originalText,
        targetCase,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
