const http = require('http');
const { convertToCase } = require('./convertToCase/index');

const caseOptions = ['SNAKE', 'KEBAB', 'UPPER', 'CAMEL', 'PASCAL'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [text, toCase] = req.url.substring(1).split('?toCase=');

    const errors = [];

    if(!text) {
      errors.push(
        {
          message:
              'Text to convert is required. '
              + 'Correct request is: '
              + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        }
      )
    }

    if(!toCase) {
      errors.push(
        {
          message:
              '"toCase" query param is required. '
              + 'Correct request is: '
              + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        }
      )
    } else if (!caseOptions.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({ errors }),
      );

      return;
    }

    const result = convertToCase(text, toCase);

    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  })

  return server;
}

module.exports = { createServer };
