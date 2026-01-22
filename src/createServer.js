const http = require('http');
const url = require('url');

const { convertToCase } = require('./convertToCase/convertToCase');

const getErrorMessages = (text, caseName) => {
  const errorsList = [];
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const correctRequest = `Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

  if (!text) {
    errorsList.push({
      message: `Text to convert is required. ${correctRequest}`,
    });
  }

  if (!caseName) {
    errorsList.push({
      message: `"toCase" query param is required. ${correctRequest}`,
    });

    return errorsList;
  }

  if (!supportedCases.includes(caseName)) {
    errorsList.push({
      message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
    });
  }

  return errorsList;
};

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
    const normalizedPathname = normalizedUrl.pathname.slice(1);
    const normalizedParams = normalizedUrl.searchParams.get('toCase');
    const errors = getErrorMessages(normalizedPathname, normalizedParams);

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(normalizedPathname, normalizedParams);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: normalizedParams,
        originalText: normalizedPathname,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
