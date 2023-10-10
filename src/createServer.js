const { BASE } = require('./constants/base');
const { convertToCase } = require('./convertToCase');

const http = require('http');

const listener = (req, res) => {
  const normalizedURL = new URL(req.url, BASE);
  const caseName = normalizedURL.searchParams.get('toCase');

  const query = req.url.split('?');
  const text = query[0].slice(1);

  const errors = getValidation(text, caseName);

  res.setHeader('Content-type', 'application/json');

  if (errors) {
    res.statusCode = 404;
    res.end(JSON.stringify(errors));
  } else {
    const newText = convertToCase(text, caseName);

    res.writeHead(200);

    res.end(
      JSON.stringify({
        originalCase: newText.originalCase,
        targetCase: caseName,
        originalText: text,
        convertedText: newText.convertedText,
      }),
    );
  }
};

const createServer = () => {
  const server = http.createServer(listener);

  return server;
};

module.exports = { createServer };

function getValidation(text, caseName) {
  const errors = [];

  if (!text) {
    errors.push(
      "Text to convert is required." +
        ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
    );
  }

  if (!caseName) {
    errors.push(
      '"toCase" query param is required. ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
    );
  } else if (
    caseName !== "SNAKE" &&
    caseName !== "KEBAB" &&
    caseName !== "CAMEL" &&
    caseName !== "PASCAL" &&
    caseName !== "UPPER"
  ) {
    errors.push(
      "This case is not supported. " +
        "Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER."
    );
  }

  return !errors.length
    ? null
    : {
        errors: errors.map((errMessage) => ({ message: errMessage })),
      };
}
