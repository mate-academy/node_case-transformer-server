function createServer() {
  const http = require('http');
  const { validateConvertParams } = require('./validateConvertParams');

  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    let resultData = {};
    const text = normalizedURL.pathname.slice(1);
    const caseName = normalizedURL.searchParams.get('toCase');
    const errors = validateConvertParams(text, caseName);

    res.setHeader('content-type', 'application/json');

    if (errors.length === 0) {
      const { convertToCase } = require('./convertToCase');

      const convertationResult = convertToCase(text, caseName);
      const convertationOriginalValues = {
        originalText: text,
        targetCase: caseName,
      };

      Object.assign(convertationResult, convertationOriginalValues);

      resultData = convertationResult;
      res.statusCode = 200;
      res.statusMessage = 'OK';
    } else {
      resultData = { errors };
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
    }

    res.end(JSON.stringify(resultData));
  });
}

module.exports = { createServer };
