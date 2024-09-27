const http = require('http');
const { convertToCase } = require('./convertToCase');
const createServer = () =>
  http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const originalText = req.url.slice(1).split('?')[0];
    const targetCase = new URLSearchParams(req.url
      .slice(1)
      .split('?')[1])
      .get('toCase');
    const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (originalText.length === 0) {
      const message = 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

      errors.push({ message });
    }

    if (!targetCase) {
      const message = '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

      errors.push({ message });
    }

    if (targetCase && !caseTypes.includes(targetCase)) {
      const message = 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

      errors.push({ message });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

module.exports = { createServer };
