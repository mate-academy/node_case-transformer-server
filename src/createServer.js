const { createServer } = require('http');

const { convertToCase } = require('./convertToCase');
const { TO_CASE_QUERY } = require('./variables');
const { validateUserData } = require('./validateUserData');

module.exports.createServer = () =>
  createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const url = new URL(request.url, `http://${request.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get(TO_CASE_QUERY);

    const errors = validateUserData(originalText, targetCase);

    if (errors.length) {
      response.writeHead(400);
      response.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(originalText, targetCase);

    response.writeHead(200);

    response.end(
      JSON.stringify({
        targetCase,
        originalText,
        ...convertedText,
      }),
    );
  });
