const { errorTypes } = require('./errorTypes.js');
const { CASES } = require('./CASES.js');

function checkForErrors(toCase, textToConvert) {
  const errors = [];

  if (!toCase) {
    errors.push({
      message: errorTypes.toCaseRequired,
    });
  } else if (!CASES.has(toCase.toUpperCase())) {
    errors.push({
      message: errorTypes.toCaseNotSupported,
    });
  }

  if (!textToConvert) {
    errors.push({
      message: errorTypes.textToConvertRequired,
    });
  }

  return errors;
}

module.exports = { checkForErrors };
