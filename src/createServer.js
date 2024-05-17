const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateInputData } = require('./utils/validateInputData');
const { detectCase } = require('./convertToCase/detectCase');

const PORT = process.env.PORT || 1595;

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://localhost:${PORT}`);
    const originalText = decodeURIComponent(normalizedUrl.pathname.slice(1));
    const originalCase = detectCase(originalText);
    const toCase = normalizedUrl.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = validateInputData(originalText, toCase);

    if (errors.length) {
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedTextData = convertToCase(originalText, toCase);

    const originalTextData = {
      originalCase,
      targetCase: toCase,
      originalText: originalText,
    };

    const result = Object.assign(originalTextData, convertedTextData);

    res.end(JSON.stringify(result));
  });
};

module.exports = {
  createServer,
};
