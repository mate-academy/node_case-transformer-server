const { caseNames } = require('./constants');

const correctRequest = '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>';

const errorMessages = {
  MissingText: `Text to convert is required. Correct request is: "${correctRequest}".`,
  MissingCase: `"toCase" query param is required. Correct request is: "${correctRequest}".`,
  WrongCase: `This case is not supported. Available cases: ${caseNames.join(', ')}.`,
};

module.exports = { errorMessages };
