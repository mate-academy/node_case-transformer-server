const http = require('http');
const { normalizeUrl } = require('./utils/normalizeUrl');
const { getErrors } = require('./utils/getErrors');
const { convertToCase } = require('./convertToCase/convertToCase');
const { sendRequest } = require('./utils/sendRequest');

function createServer() {
  const server = http.createServer((req, res) => {
    const [textToFormat, caseToFormat] = normalizeUrl(req);
    const errors = getErrors(textToFormat, caseToFormat);

    if (errors.length > 0) {
      sendRequest(res, 'Bad request', 400, { errors });

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToFormat,
      caseToFormat,
    );

    const requestData = {
      originalCase,
      convertedText,
      targetCase: caseToFormat,
      originalText: textToFormat,
    };

    sendRequest(res, 'OK', 200, requestData);
  });

  return server;
}

module.exports = { createServer };
