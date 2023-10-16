const {
  CORRECT_REQUEST_MESSAGE,
  CASE_OPTIONS,
} = require('./constants/constants');

const errorMessages = {
  NO_TEXT: 'Text to convert is required. '
    + `Correct request is: ${CORRECT_REQUEST_MESSAGE}`,
  NO_CASE: '"toCase" query param is required. Correct request is: '
    + CORRECT_REQUEST_MESSAGE,
  NOT_VALID_CASE: `This case is not supported. Available cases: ${CASE_OPTIONS.join(', ')}.`,
};

module.exports = { errorMessages };
