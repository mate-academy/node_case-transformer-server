// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const {
  TOCASE_REQUIRED_MESSAGE,
  TEXT_REQUIRED_MESSAGE,
  INVALID_TOCASE_MESSAGE,
  CORRECT_TYPE_MESSAGE,
} = require('./messages');

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((request, response) => {
    // We'll answer only on requests with a 'text/html' accept header:

    // Reconstruct URL to avoid using url module...well...
    const url = new URL(
      request.url, request.protocol + '://' + request.headers.host,
    );
    const originalText = url.pathname.split('/').slice(1);
    const urlQuery = new URLSearchParams(url.search);
    const query = {};
    let result = {
      errors: [],
    };

    // Get search params from URL and convert it to object:
    for (const [key, value] of urlQuery.entries()) {
      query[key] = value;
    }

    // Set Content-Type as json:
    response.setHeader('Content-Type', 'application/json');

    // Handle error if no text to convert:
    if (!originalText[0]) {
      result.errors.push({
        message: TEXT_REQUIRED_MESSAGE + CORRECT_TYPE_MESSAGE,
      });
    }

    // Handle error if 'to Case' to convert:
    if (!query.toCase) {
      result.errors.push({
        message: TOCASE_REQUIRED_MESSAGE + CORRECT_TYPE_MESSAGE,
      });
    }

    // Handle error if 'to Case' is invalid:
    if (query.toCase && !CASES.includes(query.toCase)) {
      result.errors.push({
        message: INVALID_TOCASE_MESSAGE,
      });
    }

    // If we dont have anu errors:
    if (result.errors.length === 0) {
      // Convert text to target case:
      result = {
        targetCase: query.toCase,
        ...convertToCase(originalText[0], query.toCase),
        originalText: originalText[0],
      };
    }

    // Return data to render on page:
    response.end(JSON.stringify(result));
  });
}

module.exports = {
  createServer,
}
