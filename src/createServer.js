const http = require('http');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function convertToCase(caseName, text) {
  if (!text) return { originalCase: 'UNKNOWN', convertedText: '' };

  const words = text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  switch (caseName) {
    case 'SNAKE':
      return {
        originalCase: detectCase(text),
        convertedText: words.map(w => w.toLowerCase()).join('_'),
      };
    case 'KEBAB':
      return {
        originalCase: detectCase(text),
        convertedText: words.map(w => w.toLowerCase()).join('-'),
      };
    case 'CAMEL':
      return {
        originalCase: detectCase(text),
        convertedText: words
          .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
          .join(''),
      };
    case 'PASCAL':
      return {
        originalCase: detectCase(text),
        convertedText: words.map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(''),
      };
    case 'UPPER':
      return {
        originalCase: detectCase(text),
        convertedText: words.map(w => w.toUpperCase()).join('_'),
      };
    default:
      throw new Error(`Unknown case name: ${caseName}`);
  }
}

function detectCase(text) {
  if (text.includes('_')) return 'SNAKE';
  if (text.includes('-')) return 'KEBAB';
  if (/^[A-Z]/.test(text)) return 'PASCAL';
  if (/^[a-z]/.test(text) && /[A-Z]/.test(text)) return 'CAMEL';
  if (text === text.toUpperCase()) return 'UPPER';
  return 'UNKNOWN';
}

function createServer() {
  return http.createServer((req, res) => {
    try {
      const [path, queryString] = req.url.split('?');
      const rawText = path.slice(1);
      const text = decodeURIComponent(rawText).replace(/^\/+|\/+$/g, '').trim();

      const params = new URLSearchParams(queryString || '');
      const toCase = params.get('toCase');

      const errors = [];

      if (!text) {
        errors.push({
          message:
            'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!toCase) {
        errors.push({
          message:
            '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!CASES.includes(toCase)) {
        errors.push({
          message:
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }

      if (errors.length > 0) {
        res.statusCode = 400;
        res.statusMessage = 'Bad request';
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ errors }, null, 2));
        return;
      }

      let result;
      try {
        result = convertToCase(toCase, text);
      } catch (err) {
        res.statusCode = 500;
        res.statusMessage = 'Internal Server Error';
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ errors: [{ message: err.message }] }, null, 2));
        return;
      }

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify(
          {
            originalCase: result.originalCase,
            targetCase: toCase,
            originalText: text,
            convertedText: result.convertedText,
          },
          null,
          2
        )
      );
    } catch (err) {
      res.statusCode = 500;
      res.statusMessage = 'Internal Server Error';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors: [{ message: err.message }] }, null, 2));
    }
  });
}

module.exports = { createServer };

