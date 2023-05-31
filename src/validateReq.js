/* eslint-disable no-console */

const validateReq = (textToConvert, caseToConvert) => {
  const errors = [];
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const requestTemplate = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';
  const casesList = `${cases.join(', ')}.`;

  if (!textToConvert) {
    errors.push({
      message: `Text to convert is required. Correct request is: ${requestTemplate}.`,
    });
  }

  if (!caseToConvert) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: ${requestTemplate}.`,
    });
  };

  if (caseToConvert && !cases.includes(caseToConvert)) {
    errors.push({
      message: `This case is not supported. Available cases: ${casesList}.`,
    });
  }

  return errors;
};

module.exports = { validateReq };
