/* eslint-disable no-console */
/* eslint-disable max-len */
const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');
const { catchErrors } = require('./utils/errorUtils');

function createServer() {
  return http.createServer((req, res) => {
    try {
      const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
      const pathname = normalizedUrl.pathname.slice(1);
      const queryParams = normalizedUrl.searchParams.get('toCase');

      res.setHeader('Content-Type', 'application/json');

      const errors = catchErrors(pathname, queryParams);

      if (!errors.length) {
        const { originalCase, convertedText } = convertToCase(pathname, queryParams);

        res.end(JSON.stringify({
          originalCase,
          convertedText,
          originalText: pathname,
          targetCase: queryParams,
        }));
      } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ errors }));
      }
    } catch (error) {
      console.error('Error during request processing:', error);
      res.statusCode = 500;
      res.end(JSON.stringify({ errors: [{ message: 'Internal Server Error' }] }));
    }
  });
}

module.exports = { createServer };
