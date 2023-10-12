const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const {
  SUCCESS_CODE,
  SUCCESS_STATUS,
  ERROR_CODE,
  ERROR_STATUS,
} = require('./variables');
const { validateData } = require('./validation');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = SUCCESS_CODE;
    res.statusMessage = SUCCESS_STATUS;

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const formattingType = normalizedURL.searchParams.get('toCase');
    const textForFormatting = normalizedURL.pathname.slice(1);

    const errors = validateData(formattingType, textForFormatting);

    if (errors.length) {
      res.statusCode = ERROR_CODE;
      res.statusMessage = ERROR_STATUS;

      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(textForFormatting, formattingType);

    res.end(JSON.stringify({
      ...convertedText,
      targetCase: formattingType,
      originalText: textForFormatting,
    }));
  });
}

module.exports = {
  createServer,
};
