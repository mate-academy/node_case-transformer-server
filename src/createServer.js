const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'UPPER', 'PASCAL'];

function makeServer() {
  return http.createServer((req, res) => {
    const myURL = new URL(req.url, 'http://localhost');
    const originalText = myURL.pathname.slice(1);
    const targetCase = myURL.searchParams.get('toCase');
    const errorsList = [];

    if (!originalText.length) {
      errorsList.push(
        // eslint-disable-next-line max-len
        { message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
      );
    }

    if (!myURL.searchParams.has('toCase')) {
      errorsList.push(
        // eslint-disable-next-line max-len
        { message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
      );
    } else if (!SUPPORTED_CASES.includes(targetCase)) {
      errorsList.push(
        // eslint-disable-next-line max-len
        { message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
      );
    }

    res.setHeader('Content-Type', 'application/json');

    if (errorsList.length) {
      res.statusCode = 400;

      res.end(
        JSON.stringify(
          {
            errors: errorsList,
          },
        ),
      );

      return;
    }

    const responseBody = { originalText, targetCase };

    res.end(
      JSON.stringify(
        {
          ...responseBody,
          ...convertToCase(originalText, targetCase),
        },
      ),
    );
  });
}

module.exports.createServer = makeServer;
