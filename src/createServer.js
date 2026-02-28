const http = require('http');
const { convertToCase } = require('./convertToCase');
const { handleError } = require('./errorMessages');

function createServer() {
  const getServer = http.createServer((request, response) => {
    response.setHeader('Content-type', 'application/json');

    const updatedUrl = new URL(request.url, `http://${request.headers.host}`);
    const textToConvert = updatedUrl.pathname.slice(1);
    const caseToConvert = updatedUrl.searchParams.get('toCase');
    const handleErrors = handleError(textToConvert, caseToConvert);

    if (handleErrors.errors.length) {
      response.statusCode = 400;
      response.end(JSON.stringify(handleErrors));
    } else {
      const converted = convertToCase(textToConvert, caseToConvert);

      response.end(JSON.stringify({
        ...converted,
        originalText: textToConvert,
        targetCase: caseToConvert,
      }));
    }
  });

  return getServer;
}

module.exports = {
  createServer,
};
