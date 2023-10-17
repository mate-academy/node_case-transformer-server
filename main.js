const { createServer } = require('./src/createServer');
const { convertToCase } = require('./src/convertToCase/convertToCase');
const server = createServer();

server.on('request', (req, res) => {
  const { url } = req;
  const [path, queryString] = url.split('?');
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const params = new URLSearchParams(queryString);
  const textToConvert = path.slice(1);
  const toCase = params.get('toCase');

  if (queryString === undefined) {
    respondWithError(res,
      400,
      `"toCase" query param is required.
       Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`);
  } else if (textToConvert.length < 1) {
    respondWithError(res,
      400,
      `Text to convert is required. Correct request is:
      "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`);
  } else if (!supportedCases.includes(toCase.toUpperCase())) {
    respondWithError(res,
      400,
      `This case is not supported. Available cases:
      SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`);
  } else {
    const result = convertToCase(textToConvert, toCase.toUpperCase());

    res.writeHead(200, { 'Content-Type': 'application/json' });

    const responseJSON = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(responseJSON));
  }
});

server.listen(5700, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});

function respondWithError(res, statusCode, message) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });

  const errorResponse = {
    errors: [{ message }],
  };

  res.end(JSON.stringify(errorResponse));
}
