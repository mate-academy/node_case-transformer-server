const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { errorRequest } = require('./errorRequest');

const createServer = () => http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const originalText = requestUrl.pathname.slice(1);
  const targetCase = requestUrl.searchParams.get('toCase');

  res.setHeader('Content-Type', 'application/json');

  const errors = errorRequest(originalText, targetCase);

  if (errors.length > 0) {
    res.statusCode = 400;

    res.end(JSON.stringify({
      errors,
    }));
  } else {
    res.statusCode = 200;

    const result = convertToCase(originalText, targetCase);
    const responseData = {
      originalCase: result.originalCase,
      targetCase,
      originalText,
      convertedText: result.convertedText,
    };
    const jsonContent = JSON.stringify(responseData);

    res.end(jsonContent);
  }
});

module.exports = {
  createServer,
};
