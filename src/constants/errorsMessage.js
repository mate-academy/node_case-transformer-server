const {
  CORRECT_REQUEST_MESSAGE,
  CASE_OPTIONS,
  CORRECT_REQUEST,
} = require('./constants/constants');

const errorMessages = {
  NO_TEXT: 'Text to convert is required. '
    + `${CORRECT_REQUEST} ${CORRECT_REQUEST_MESSAGE}`,
  NO_CASE: '"toCase" query param is required. ' + CORRECT_REQUEST
    + CORRECT_REQUEST_MESSAGE,
  NOT_VALID_CASE: `This case is not supported. Available cases: ${CASE_OPTIONS.join(', ')}.`,
};

module.exports = { errorMessages };
