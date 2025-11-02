const { createServer: _createServer } = require('http');
const { convertToCase } = require('./convertToCase');

const paramsType = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = _createServer((req, res) => {
    // Parse URL by splitting on ? and using URLSearchParams
    const [pathname, queryString = ''] = req.url.split('?');
    const path = pathname.slice(1);
    const errorMessage = [];
    const response = {};

    const params = Object.fromEntries(
      new URLSearchParams(queryString).entries(),
    );

    if (!path) {
      errorMessage.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!params.toCase) {
      errorMessage.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (params.toCase && !paramsType.includes(params.toCase)) {
      errorMessage.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errorMessage.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: errorMessage }));

      return;
    }

    // Call convertToCase with correct argument order and store result
    const result = convertToCase(path, params.toCase);

    response.originalCase = result.originalCase;
    response.targetCase = params.toCase;
    response.originalText = path;
    response.convertedText = result.convertedText;

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = { createServer };
