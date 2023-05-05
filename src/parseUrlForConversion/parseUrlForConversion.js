const { detectCase } = require("../convertToCase/detectCase");
const { toWords } = require("../convertToCase/toWords");
const { wordsToCase } = require("../convertToCase/wordsToCase");
const { validCases } = require('../utils/validCases');

function parseUrlForConversion(url) {
  const errorsMessages = {
    noTextToConvert: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    noQueryParam: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    unsupportedCase: "This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.",
  }

  const errors = [];

  if (url.length === 1) {
    return {
      response: {
        errors: [
          {
            message: errorsMessages.noTextToConvert,
          },
          {
            message: errorsMessages.noQueryParam,
          },
          {
            message: errorsMessages.unsupportedCase,
          },
        ],
      },
    };
  }

  if (!url.includes("?")) {
    return {
      response: {
        errors: [
          {
            message: errorsMessages.noQueryParam,
          },
        ],
      },
    };;
  }

  let result = {};

  const parts = url.split("?");

  if (parts[0].length < 2) {
    errors.push({message: errorsMessages.noTextToConvert});
  }

  const originalText = parts[0].slice(1);
  const params = new URLSearchParams(parts[1]);
  const targetCase = params.get("toCase");

  if (!targetCase) {
    errors.push({ message: errorsMessages.noQueryParam, });
  } else if (!validCases.includes(targetCase.toUpperCase())) {
    errors.push({ message: errorsMessages.unsupportedCase, })
  }

  if (errors.length === 0) {
    const originalCase = detectCase(originalText);
    const updatedText = toWords(originalText, originalCase);
    const convertedText = wordsToCase(updatedText, targetCase);

    result = {
      response: {
        errors,
        targetCase,
        originalCase,
        originalText,
        convertedText,
      },
    };
  } else {
    result = {
      response: { errors, },
    }
  }

  return result;
}

module.exports = { parseUrlForConversion };
