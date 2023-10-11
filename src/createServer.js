const { BASE } = require('./constants/base');
const { CORRECT_REQUEST_MESSAGE }
  = require('./constants/correctRequestMessage');
const { CASE_NAMES } = require('./constants/caseNames');
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
      'Text to convert is required. '
      + CORRECT_REQUEST_MESSAGE,
    );
  }

  if (!caseName) {
    errors.push(
      '"toCase" query param is required. '
      + CORRECT_REQUEST_MESSAGE,
    );
  } else if (!CASE_NAMES.includes(caseName)) {
    errors.push(
      'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    );
  }

  return !errors.length
    ? null
    : {
      errors: errors.map((errMessage) => ({ message: errMessage })),
    };
}
