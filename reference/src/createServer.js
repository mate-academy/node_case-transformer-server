const http = require('http');
const { convertToCase } = require('./convertToCase');
const {
  formatResponse,
  readURL,
  sendResponse,
  validateArguments,
} = require('./server');

function createServer() {
  return http.createServer((req, res) => {
    let args = readURL(req);

    try {
      args = validateArguments(args);
    } catch (errors) {
      sendResponse(res, 400, errors);

      return;
    }

    const result = convertToCase(args.text, args.toCase);

    sendResponse(
      res,
      200,
      formatResponse(args, result),
    );
  });
}

module.exports = {
  createServer,
};
