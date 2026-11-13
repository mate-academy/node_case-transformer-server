'use strict';

const http = require('http');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const HINT = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

function detectCase(text) {
  if (text.includes('_')) {
    return text === text.toUpperCase() ? 'UPPER' : 'SNAKE';
  }

  if (text.includes('-')) {
    return 'KEBAB';
  }

  if (/^[A-Z]/.test(text) && /[a-z]/.test(text)) {
    return 'PASCAL';
  }

  if (/^[a-z]/.test(text) && /[A-Z]/.test(text)) {
    return 'CAMEL';
  }

  return 'CAMEL';
}

function splitToWords(text, originalCase) {
  switch (originalCase) {
    case 'SNAKE':
    case 'UPPER':
      return text.split('_').filter(Boolean);
    case 'KEBAB':
      return text.split('-').filter(Boolean);
    default:
      return text.split(/(?=[A-Z])/).filter(Boolean);
  }
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function convert(text, targetCase) {
  const originalCase = detectCase(text);
  const words = splitToWords(text, originalCase);

  let convertedText;

  switch (targetCase) {
    case 'SNAKE':
      convertedText = words.map((w) => w.toLowerCase()).join('_');
      break;
    case 'KEBAB':
      convertedText = words.map((w) => w.toLowerCase()).join('-');
      break;
    case 'UPPER':
      convertedText = words.map((w) => w.toUpperCase()).join('_');
      break;
    case 'PASCAL':
      convertedText = words.map(capitalize).join('');
      break;
    case 'CAMEL':
      convertedText = words
        .map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w)))
        .join('');
      break;
    default:
      convertedText = text;
  }

  return { originalCase, convertedText };
}

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const originalText = decodeURIComponent(url.pathname.slice(1));
    const targetCase = url.searchParams.get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push({ message: `Text to convert is required. ${HINT}` });
    }

    if (!targetCase) {
      errors.push({ message: `"toCase" query param is required. ${HINT}` });
    } else if (!SUPPORTED_CASES.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          `Available cases: ${SUPPORTED_CASES.join(', ')}.`,
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convert(originalText, targetCase);

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });
}

module.exports = { createServer };
