const http = require('http');
const url = require('url');

const { convertToCase } = require('./convertToCase/convertToCase');

const getErrorMessages = (text, caseName) => {
  const errorsList = [];
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const correctRequest = `Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"`;

  if (!text) {
    errorsList.push(`Text to convert is required. ${correctRequest}`);
  }

  if (!caseName) {
    errorsList.push(`toCase" query param is required. ${correctRequest}`);
  }

  if (!supportedCases.includes(supportedCases)) {
    errorsList.push(
      `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
    );
  }

  if (!errorsList.length) {
    return errorsList;
  }
};

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
    const normalizedPathname = normalizedUrl.pathname.slice(1);
    const normalizedParams = normalizedUrl.searchParams.get('toCase');
    const errors = getErrorMessages(normalizedPathname, normalizedParams);
    const result = convertToCase(normalizedPathname, normalizedParams);

    global.console.log(result);

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: normalizedParams,
        targetCase: result.originalCase,
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
