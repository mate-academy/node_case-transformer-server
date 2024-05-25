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
    const targetCase = normalizedUrl.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = validateInputData(originalText, targetCase);

    try {
      if (errors.length) {
        throw new Error(`${errors}`);
      }

      const convertedTextData = convertToCase(originalText, targetCase);

      const originalTextData = {
        originalCase,
        targetCase,
        originalText,
      };

      const result = Object.assign(originalTextData, convertedTextData);

      res.end(JSON.stringify(result));
    } catch (error) {
      res.end(JSON.stringify({ errors }));
    }
  });
};

module.exports = {
  createServer,
};
