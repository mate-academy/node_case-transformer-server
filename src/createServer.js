const http = require('http');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const reqToArr = req.url.split('?');
    const textToConvert = reqToArr[0];
    const queryString = reqToArr[1];

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    const hasTextToConvert = textToConvert !== '/';

    const resultObj = {};

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

    const normalizeText = (text) => {
      if (text.includes('-')) {
        resultObj.originalText = text;
        resultObj.originalCase = 'KEBAB';

        return text.split('-');
      }

      if (text.includes('_') && text !== text.toUpperCase()) {
        resultObj.originalText = text;
        resultObj.originalCase = 'SNAKE';

        return text.split('_').map((word) => word.toLowerCase());
      }

      if (text.includes('_') && text === text.toUpperCase()) {
        resultObj.originalText = text;
        resultObj.originalCase = 'UPPER';

        return text.split('_').map((word) => word.toLowerCase());
      }

      if (
        text[0] === text[0].toUpperCase() &&
        text[1] === text[1].toLowerCase()
      ) {
        const wordRe = /($[a-z])|[A-Z][^A-Z]+/g;

        resultObj.originalText = text;
        resultObj.originalCase = 'PASCAL';

        return text.match(wordRe).map((word) => word.toLowerCase());
      }

      if (text[0] === text[0].toLowerCase() && text !== text.toLowerCase()) {
        resultObj.originalText = text;
        resultObj.originalCase = 'CAMEL';

        return text
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .split(' ')
          .map((word) => word.toLowerCase());
      }
    };

    if (toCase && hasTextToConvert) {
      switch (toCase) {
        case 'UPPER':
          resultObj.convertedText = normalizeText(textToConvert.slice(1))
            .join('_')
            .toUpperCase();
          resultObj.targetCase = 'UPPER';

          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(resultObj));
          break;
        case 'SNAKE':
          resultObj.convertedText = normalizeText(textToConvert.slice(1)).join(
            '_',
          );
          resultObj.targetCase = 'SNAKE';

          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(resultObj));
          break;
        case 'KEBAB':
          resultObj.convertedText = normalizeText(textToConvert.slice(1)).join(
            '-',
          );
          resultObj.targetCase = 'KEBAB';

          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(resultObj));
          break;
        case 'PASCAL':
          resultObj.convertedText = normalizeText(textToConvert.slice(1))
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join('');
          resultObj.targetCase = 'PASCAL';

          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(resultObj));
          break;
        case 'CAMEL':
          resultObj.convertedText =
            normalizeText(textToConvert.slice(1))[0] +
            normalizeText(textToConvert.slice(1))
              .slice(1)
              .map((word) => word[0].toUpperCase() + word.slice(1));
          resultObj.targetCase = 'CAMEL';

          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(resultObj));
          break;
      }
    }

    res.end();
  });

  return server;
};

module.exports = { createServer };
