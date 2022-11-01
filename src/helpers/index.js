'use strict';

const { convertToCase } = require('../convertToCase');
const { ALL_CASES, STATUS_CODE, STATUS_TEXT } = require('../constant');

const errorHandler = ({ res, errors }) => {
  res.statusCode = STATUS_CODE.BAD_REQUEST;
  res.statusText = STATUS_CODE.BAD_REQUEST;

  res.end(
    JSON.stringify({
      errors,
    }),
  );
};

const successHandler = ({ res, textToTranslate, toCase }) => {
  res.statusCode = STATUS_CODE.OK;
  res.statusText = STATUS_TEXT.OK;

  const { originalCase, convertedText } = convertToCase(
    textToTranslate,
    ALL_CASES[toCase],
  );

  res.end(
    JSON.stringify({
      originalCase,
      targetCase: ALL_CASES[toCase],
      originalText: textToTranslate,
      convertedText,
    }),
  );
};

module.exports = { errorHandler, successHandler };
