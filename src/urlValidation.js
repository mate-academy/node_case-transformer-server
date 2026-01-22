'use strict';

const textStyleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

/* eslint-disable */
const errorOptions = {
  texRequired: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseRequired: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSuported: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
}
/* eslint-enable */

function urlValidation(text, toCase) {
  const errors = [];

  const { texRequired, toCaseRequired, notSuported } = errorOptions;

  if (!text) {
    errors.push({ message: texRequired });
  }

  if (!toCase) {
    errors.push({ message: toCaseRequired });
  }

  if (!textStyleCases.includes(toCase) && toCase) {
    errors.push({ message: notSuported });
  }

  return errors;
}

module.exports = { urlValidation };
