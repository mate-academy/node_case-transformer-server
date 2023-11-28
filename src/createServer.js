const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { handleFaviconRequest } = require('./faviconRequest');
const { validateRequest } = require('./validatedRequest');
const { createErrorResponse } = require('./errorResponse');
const { createSuccessResponse } = require('./successResponse');
const { createJsonResponse } = require('./jsonPesponse');

const PORT = 4000;

const createServer = () => {
  const server = http.createServer((request, response) => {
    if (request.url === '/favicon.ico') {
      handleFaviconRequest(response);

      return;
    }

    const BASE_URL = `http://localhost:${PORT}/`;
    const query = new URL(request.url, BASE_URL);
    const textToConvert = query.pathname.slice(1);
    const toCase = new URLSearchParams(query.search).get('toCase');

    const errors = validateRequest(textToConvert, toCase);

    if (errors.length > 0) {
      createErrorResponse(response, 400, errors);

      return;
    }

    const convertData = convertToCase(textToConvert, toCase);

    const responseBody = createSuccessResponse(
      convertData,
      toCase,
      textToConvert,
    );

    createJsonResponse(response, 200, responseBody);
  });

  return server;
};

createServer().listen(PORT, () => {
  /* eslint-disable */
  console.log(`Server is running on http://localhost:${PORT}/`);
});

module.exports = { createServer };
