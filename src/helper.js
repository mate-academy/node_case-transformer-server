const { noTextError, noCaseError, wrongCaseError } = require('./errorMessages');
const { TO_CASE_PARAM } = require('./constants');

module.exports = {
  validateParams: (text, toCase) => {
    const errors = [];
    const validCases = ['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'];

    if (!text) {
      errors.push({ message: noTextError });
    }

    if (!toCase) {
      errors.push({ message: noCaseError });
    }

    if (toCase && !validCases.includes(toCase)) {
      errors.push({ message: wrongCaseError });
    }

    return errors;
  },
  convertUrlToParams: (url) => {
    const urlParams = url.split('?');
    const textToConvert = urlParams[0]?.slice(1);
    const queryString = urlParams[1];
    const params = new URLSearchParams(queryString);
    const toCase = params.get(TO_CASE_PARAM);

    return { textToConvert, toCase };
  },
};
