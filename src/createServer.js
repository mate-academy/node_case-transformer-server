const http = require('http');
const { requestParse } = require('./requestParse');
const { jsonResponse } = require('./jsonResponse');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const { errors, text, toCase } = requestParse(req.url);

    if (errors.length > 0) {
      return jsonResponse(res, 400, {
        errors: errors.map((message) => ({ message })),
      });
    }

    const result = convertToCase(text, toCase);

    return jsonResponse(res, 200, {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    });
  });
}

module.exports = { createServer };
