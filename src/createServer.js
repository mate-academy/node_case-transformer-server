// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];
    let text = '';
    let toCase = '';

    if (req.url.length <= 1) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });

      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else {
      const urlArray = req.url.split('?');

      text = urlArray[0];

      let params;
      let queryString = '';

      if (text.length > 1) {
        text = text.substring(1);
      } else {
        errors.push({
          message:
            // eslint-disable-next-line max-len
            'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (urlArray.length === 1) {
        errors.push({
          message:
            // eslint-disable-next-line max-len
            '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else {
        queryString = urlArray[1];
        params = new URLSearchParams(queryString);
        toCase = params.get('toCase');

        if (!toCase) {
          errors.push({
            message:
              // eslint-disable-next-line max-len
              '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          });
        } else {
          const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

          if (validCases.indexOf(toCase) === -1) {
            errors.push({
              message:
                // eslint-disable-next-line max-len
                'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            });
          }
        }
      }
    }

    if (errors.length > 0) {
      res.writeHead(400);

      res.end(
        JSON.stringify({
          errors: errors,
        }),
      );

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.writeHead(200);

    res.end(
      JSON.stringify({
        originalCase: `${originalCase}`,
        targetCase: `${toCase}`,
        convertedText: `${convertedText}`,
        originalText: `${text}`,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
