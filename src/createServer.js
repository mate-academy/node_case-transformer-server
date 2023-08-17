const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { error, supportedCases } = require('./error');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const query = parsedUrl.searchParams;

    const convertedText = path.slice(1);
    const targetCase = query.get('toCase');

    const errors = [];

    if (!convertedText) {
      errors.push({ message: error.correctRequestText });
    }

    if (!targetCase) {
      errors.push({ message: error.caseIsRequired });
    } else {
      const upperCaseTargetCase = targetCase.toUpperCase();

      if (!supportedCases.includes(upperCaseTargetCase)) {
        errors.push({ message: error.availableCases });
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
