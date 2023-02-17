const http = require('http');
const convertToCase
  = require('./convertToCase/convertToCase').convertToCase;

function getURLErrors(orirginalText, targetCase) {
  const arrOfMessages = [];
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (orirginalText === '/') {
    arrOfMessages.push({
      message:
        'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase === null) {
    arrOfMessages.push({
      message:
      '"toCase" query param is required. Correct request is: '
      + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase && !availableCases.includes(targetCase)) {
    arrOfMessages.push({
      message:
      'This case is not supported. Available cases: '
      + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return arrOfMessages;
}

function createServer() {
  const server = http.createServer((req, res) => {
    const parts = req.url.split('?');
    const textToConvert = parts[0];
    const originalText = textToConvert.slice(1);
    const params = new URLSearchParams(parts[1]);
    const targetCase = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = getURLErrors(textToConvert, targetCase);

    if (errors.length !== 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      const errorBody = JSON.stringify({ errors });

      return res.end(errorBody);
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const body = JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    });

    res.end(body);
  });

  return server;
}

module.exports.createServer = createServer;
