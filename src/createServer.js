const http = require('http');
const { convertToCase } = require('./convertToCase');

const PORT = 5700;
const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const allowableURL = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const errorMessages = {
  noText: `Text to convert is required. Correct request is: ${allowableURL}`,
  noCase: `"toCase" query param is required. Correct request is: ${allowableURL}`,
  wrongCase: `This case is not supported. Available cases: ${cases.join(', ')}.`,
};

function createServer() {
  const server = http.createServer((req, res) => {
    const errorsList = {
      errors: [],
    };

    res.setHeader('Content-type', 'application/json');

    const normalizeURL = new URL(req.url, `http://localhost:${PORT}`);

    const text = normalizeURL.pathname.slice(1);
    const toCase = normalizeURL.searchParams.get('toCase');

    if (text === 'favicon.ico') {
      return res.end();
    } else {
      if (!text.length) {
        errorsList.errors.push({
          message: errorMessages.noText,
        });
      }

      if (!toCase) {
        errorsList.errors.push({
          message: errorMessages.noCase,
        });
      }

      if (toCase && !cases.includes(toCase)) {
        errorsList.errors.push({
          message: errorMessages.wrongCase,
        });
      }

      if (errorsList.errors.length) {
        res.statusCode = 400;
        res.statusMessage = 'Bad request';
        res.write(JSON.stringify(errorsList));

        return res.end();
      } else {
        res.statusCode = 200;

        const result = convertToCase(text, toCase);

        res.write(JSON.stringify({
          convertedText: result.convertedText,
          originalCase: result.originalCase,
          originalText: text,
          targetCase: toCase,
        }));

        return res.end();
      }
    }
  });

  return server;
}

createServer().listen(PORT);

module.exports = {
  createServer,
};
