'use strict';

const { validateText } = require('../validation/validateText');
const { validateParams } = require('../validation/validateParams');
const { generateErrorResponse } = require('../helpers/generateErrorResponse');

const parseUrl = (url) => {
  const [rawText, rawParams] = url.split('?');
  const res = {
    text: null,
    targetCase: null,
    error: null,
  };

  const text = rawText.slice(1);
  const params = new URLSearchParams(rawParams);

  const validateTextResponse = validateText(text);
  const validateParamsResponse = validateParams(params);

  if (validateParamsResponse || validateTextResponse) {
    res.error = generateErrorResponse(
      validateTextResponse,
      validateParamsResponse,
    );
  } else {
    const caseToSet = params.get('toCase');

    res.text = text;
    res.targetCase = caseToSet;
  }

  return res;
};

module.exports = { parseUrl };
