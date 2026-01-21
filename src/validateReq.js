/* eslint-disable no-console */

const validateReq = (textToConvert, caseToConvert) => {
  const result = {
    errors: [],
  };
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const requestTemplate = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';
  const casesList = `${cases.join(', ')}.`;

  if (!textToConvert) {
    result.errors.push({
      message: `Text to convert is required. Correct request is: ${requestTemplate}.`,
    });
  }

  if (!caseToConvert) {
    result.errors.push({
      message: `"toCase" query param is required. Correct request is: ${requestTemplate}.`,
    });
  };

  if (caseToConvert && !cases.includes(caseToConvert)) {
    result.errors.push({
      message: `This case is not supported. Available cases: ${casesList}.`,
    });
  }

  return result;
};

module.exports = { validateReq };
