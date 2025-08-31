const http = require('http');

function createServer(params) {
  return http.createServer((req, res) => {
    const [pathPart, queryString] = req.url.split('?');
    const textToConvert = decodeURIComponent(pathPart.slice(1));
    // eslint-disable-next-line no-shadow
    const queryParams = new URLSearchParams(queryString);
    const toCase = queryParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (toCase && !SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    // eslint-disable-next-line no-undef
    const { originalCase, convertedText } = convertToCase(
      toCase,
      textToConvert,
    );

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: convertedText,
      }),
    );
  });
}

function detectCase(text) {
  if (/^[A-Z0-9_]+$/.test(text)) {
    return 'UPPER';
  }

  if (text.includes('_')) {
    return 'SNAKE';
  }

  if (text.includes('-')) {
    return 'KEBAB';
  }

  if (/^[a-z][A-Za-z]*$/.test(text)) {
    return 'CAMEL';
  }

  if (/^[A-Z][A-Za-z]*$/.test(text)) {
    return 'PASCAL';
  }

  return 'UNKNOWN';
}

function toWords(text) {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

function convertToCase(toCase, text) {
  const words = toWords(text);
  let convertedText = '';

  switch (toCase) {
    case 'SNAKE':
      convertedText = words.join('_');
      break;
    case 'KEBAB':
      convertedText = words.join('-');
      break;
    case 'CAMEL':
      convertedText = words
        .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
        .join('');
      break;
    case 'PASCAL':
      convertedText = words
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join('');
      break;

    case 'UPPER':
      convertedText = words.join('_').toUpperCase();
      break;
  }

  return { originalCase: detectCase(text), convertedText };
}

module.exports = { createServer };
