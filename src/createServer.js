const http = require('node:http');
const { convertToCase } = require('./convertToCase');

const OK = 200;
const BAD_REQUEST = 400;

const CASE_OPTIONS = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

/* eslint-disable max-len */
const NO_TEXT_MESSAGE =
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const NO_TO_CASE_PARAM_MESSAGE =
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const TARGET_CASE_NOT_SUPPORTED = `This case is not supported. Available cases: ${CASE_OPTIONS.join(', ')}.`;
/* eslint-enable max-len */

function createServer() {
  return http.createServer((req, res) => {
    const [path, query] = req.url.split('?');
    const originalText = path.split('/')[1];
    const targetCase = new URLSearchParams(query).get('toCase');

    const errors = [
      ...evalTextErrors(originalText),
      ...evalToCaseErrors(targetCase),
    ];

    if (errors.length > 0) {
      respondWithError(res, BAD_REQUEST, errors);

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    respondWithOk(res, {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    });
  });
}

function evalTextErrors(text) {
  const errors = [];

  if (!text) {
    errors.push({
      message: NO_TEXT_MESSAGE,
    });
  }

  return errors;
}

function evalToCaseErrors(toCase) {
  const errors = [];

  if (!toCase) {
    errors.push({
      message: NO_TO_CASE_PARAM_MESSAGE,
    });
  } else if (!CASE_OPTIONS.includes(toCase)) {
    errors.push({
      message: TARGET_CASE_NOT_SUPPORTED,
    });
  }

  return errors;
}

function respondWithError(res, status, errors) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = status;

  res.end(
    JSON.stringify({
      errors,
    }),
  );
}

function respondWithOk(res, body) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = OK;

  res.end(JSON.stringify(body));
}

module.exports = {
  createServer,
};
