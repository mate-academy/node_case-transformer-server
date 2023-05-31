/* eslint-disable max-len */
'use strict';

const avaliableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function checkParams(textToConvert, toCase) {
  const validation = {
    errors: [],
  };

  if (!textToConvert) {
    validation.errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!toCase) {
    validation.errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!avaliableCases.includes(toCase) && toCase) {
    validation.errors.push({ message: `This case is not supported. Available cases: ${avaliableCases.join(', ')}.` });
  }

  return validation;
}

module.exports = { checkParams };
