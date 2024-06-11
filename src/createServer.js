const http = require('http');
const { supportedCases } = require('./constants/constants');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const reqToArr = req.url.split('?');
    const textToConvert = reqToArr[0];
    const queryString = reqToArr[1];

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const STATUS_CODE_SUCCESS = 200;

    const errors = [];

    const hasTextToConvert = textToConvert !== '/';

    function sendResult(convertedText, targetCase, originalCase, originalText) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = STATUS_CODE_SUCCESS;

      res.end(
        JSON.stringify({
          targetCase,
          convertedText,
          originalText,
          originalCase,
        }),
      );
    }

    const pushErrorMessage = (message) => {
      errors.push({
        message,
      });
    };

    if (!hasTextToConvert) {
      pushErrorMessage(
        // eslint-disable-next-line max-len
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!toCase) {
      pushErrorMessage(
        // eslint-disable-next-line max-len
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (toCase && !supportedCases.includes(toCase)) {
      pushErrorMessage(
        // eslint-disable-next-line max-len
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      );
    }

    if (errors.length) {
      res.statusMessage = 'Bad request';
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
    }

    const getCase = (text) => {
      if (text.includes('-')) {
        return 'KEBAB';
      }

      if (text.includes('_') && text !== text.toUpperCase()) {
        return 'SNAKE';
      }

      if (text.includes('_') && text === text.toUpperCase()) {
        return 'UPPER';
      }

      if (
        text[0] === text[0].toUpperCase() &&
        text[1] === text[1].toLowerCase()
      ) {
        return 'PASCAL';
      }

      if (text[0] === text[0].toLowerCase() && text !== text.toLowerCase()) {
        return 'CAMEL';
      }
    };

    const normalizeText = (text, originalCase) => {
      switch (originalCase) {
        case 'KEBAB':
          return text.split('-');
        case 'SNAKE':
        case 'UPPER':
          return text.split('_').map((word) => word.toLowerCase());
        case 'PASCAL':
          const wordRe = /($[a-z])|[A-Z][^A-Z]+/g;

          return text.match(wordRe).map((word) => word.toLowerCase());
        case 'CAMEL':
          return text
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(' ')
            .map((word) => word.toLowerCase());
      }
    };

    if (toCase && hasTextToConvert) {
      const originalText = textToConvert.slice(1);
      const originalCase = getCase(originalText);
      const normalizedText = normalizeText(originalText, originalCase);

      switch (toCase) {
        case 'UPPER':
          sendResult(
            normalizedText.join('_').toUpperCase(),
            toCase,
            originalCase,
            originalText,
          );
          break;
        case 'SNAKE':
          sendResult(
            normalizedText.join('_'),
            toCase,
            originalCase,
            originalText,
          );
          break;
        case 'KEBAB':
          sendResult(
            normalizedText.join('-'),
            toCase,
            originalCase,
            originalText,
          );
          break;
        case 'PASCAL':
          sendResult(
            normalizedText
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(''),
            toCase,
            originalCase,
            originalText,
          );
          break;
        case 'CAMEL':
          sendResult(
            normalizedText
              .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
              .join(''),
            toCase,
            originalCase,
            originalText,
          );
          break;
      }
    }

    res.end();
  });

  return server;
};

module.exports = { createServer };
