const { createServer: httpCreateServer } = require('node:http');
const { convertToCase } = require('./convertToCase');

/**
 * Hjælpefunktion til at detektere formatet (Early Return)
 */
/*
function detectCase(text) {
  if (text.includes('-')) {
    return 'KEBAB';
  }

  if (text.includes('_')) {
    return text === text.toUpperCase() ? 'UPPER' : 'SNAKE';
  }

  if (/^[A-Z]/.test(text)) {
    return 'PASCAL';
  }

  if (/[a-z][A-Z]/.test(text)) {
    return 'CAMEL';
  }

  return 'SNAKE'; // Default hvis det bare er ét ord
}
*/

/**
 * Konverterer et array af ord til det ønskede format, til eet ord
 */
/*
function convertToTarget(words, targetCase) {
  switch (targetCase) {
    case 'SNAKE':
      return words.join('_').toLowerCase();
    case 'KEBAB':
      return words.join('-').toLowerCase();
    case 'CAMEL':
      return words
        .map((w, i) => {
          return i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
        })
        .join('');
    case 'PASCAL':
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('');
    case 'UPPER':
      return words.join('_').toUpperCase();
    default:
      return words.join('');
  }
}
*/

// en Arrow Function (pile-funktion), () er argumenter, ingen her, { body }
const createServer = () => {
  return httpCreateServer((req, res) => {
    // 1. Split URL og Query, url=/word?toCase=SNAKE  , web-adr ikke med i url
    const [path, query] = req.url.split('?');
    const text = path.slice(1); // Fjerner "/"  -> word
    const params = new URLSearchParams(query);
    const targetCase = params.get('toCase');

    // 2. Validering (som krævet af testen)
    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(targetCase)
    ) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ errors }));
    }

    // convertToCase(text, toCase);  ->{ originalCase, convertedText };
    const { originalCase, convertedText } = convertToCase(text, targetCase);
    // ændres nemlig ikke senere

    /*
    // 3. Logik: Detektér, Split til ord, og Konvertér
    const originalCase = detectCase(text);

    // 1. Erstat alle "hårde" separatorer med mellemrum
    // 2. Indsæt et mellemrum før store bogstaver (hvis de kommer efter
    // et lille)
    // 3. Split ved mellemrum
    const words = text
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(/\s+/)
      .map((w) => w.toLowerCase())
      .filter(Boolean);
    // .filter(Boolean) fjerner alle "tomme" eller "ugyldige" elementer i
    // words[]
    const convertedText = convertToTarget(words, targetCase);
    */
    // 4. Send svar
    const response = {
      originalCase,
      targetCase,
      convertedText,
      originalText: text,
    };

    res.end(JSON.stringify(response));
  });
};

// EKSPORTÉR ALT HER,  detectCase og convertToTarget fkt, hvis de ikke bruges
// - så accepterr linteren de ubrugte fkt detectCase
module.exports = {
  createServer,
};
