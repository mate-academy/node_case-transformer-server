const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const query = parsedUrl.searchParams;

    const convertedText = path.slice(1);
    const targetCase = query.get('toCase');

    const errors = [];
    // eslint-disable-next-line
    const correctRequestText = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    // eslint-disable-next-line
    const availableCases = `Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`;

    if (!convertedText) {
      errors.push({ message: `Text to convert is required. ${correctRequestText}` });
    }

    if (!targetCase) {
      errors.push({ message: `"toCase" query param is required. ${correctRequestText}` });
    } else {
      const upperCaseTargetCase = targetCase.toUpperCase();

      if (!supportedCases.includes(upperCaseTargetCase)) {
        errors.push({ message: `This case is not supported. ${availableCases}` });
      }
    }

    const response = {
      status: errors.length > 0 ? 400 : 200,
      headers: { 'Content-Type': 'application/json' },
      body: errors.length > 0 ? { errors } : {},
    };

    if (errors.length === 0) {
      const result = convertToCase(convertedText, targetCase.toUpperCase());

      response.body = {
        originalText: convertedText,
        targetCase: targetCase.toUpperCase(),
        convertedText: result.convertedText,
        originalCase: result.originalCase,
      };
    }

    res.writeHead(response.status, response.headers);
    res.end(JSON.stringify(response.body));
  });

  return server;
};

module.exports = { createServer };
