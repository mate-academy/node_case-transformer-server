const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const {
  NO_TEXT_ERROR_MESSAGE,
  NO_CASE_ERROR_MESSAGE,
  STATIC_CASES,
  INVALID_CASE_ERROR_MESSAGE,
} = require('./constatnts');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost:5700');

    res.setHeader('Content-Type', 'application/json');

    const textFromUrl = url.pathname.slice(1);
    const caseFromUrl = url.searchParams.get('toCase');

    const errors = {
      errors: [],
    };

    if (textFromUrl === '') {
      errors.errors.push({ message: NO_TEXT_ERROR_MESSAGE });
    }

    if (!caseFromUrl) {
      errors.errors.push({ message: NO_CASE_ERROR_MESSAGE });
    }

    if (caseFromUrl && !STATIC_CASES.includes(caseFromUrl)) {
      errors.errors.push({ message: INVALID_CASE_ERROR_MESSAGE });
    }

    if (!errors.errors.length) {
      const {
        originalCase,
        convertedText,
      } = convertToCase(textFromUrl, caseFromUrl);

      const result = {
        originalCase,
        targetCase: caseFromUrl,
        originalText: textFromUrl,
        convertedText,
      };

      res.end(JSON.stringify(result));
    } else {
      res.end(JSON.stringify(errors));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
