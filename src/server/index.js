const { readURL } = require('./readURL');
const { validateArguments } = require('./validateArguments');
const { sendResponse } = require('./sendResponse');
const { formatResponse } = require('./formatResponse');

module.exports = {
  readURL,
  validateArguments,
  sendResponse,
  formatResponse,
};
