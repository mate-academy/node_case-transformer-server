const { cases } = require('./cases');

const checkURL = (text, toCase) => {
  const errors = [];
  const example = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';

  if (!text) {
    errors.push({
      message: `Text to convert is required. Correct request is: ${example}.`,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: ${example}.`,
    });
  }

  if (!cases.includes(toCase) && toCase) {
    errors.push({
      message: `This case is not supported. Available cases: ${cases.join(', ')}.`,
    });
  }

  return errors;
};

module.exports = { checkURL };
