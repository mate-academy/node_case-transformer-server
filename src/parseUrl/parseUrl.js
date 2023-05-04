const { detectCase } = require("../convertToCase/detectCase");
const { toWords } = require("../convertToCase/toWords");
const { wordsToCase } = require("../convertToCase/wordsToCase");

function parseUrl(url) {
  if (url.length === 1) {
    return {
      isError: true,
      response: {
        errors: [
          {
            message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
          },
          {
            message:
              '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
          {
            message:
              "This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.",
          },
        ],
      },
    };
  }

  let result = {};

  if (!url.includes("?")) {
    result = {
      isError: true,
      response: {
        errors: [
          {
            message:
              '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
        ],
      },
    };

    return result;
  }

  const parts = url.split("?");

  if (parts[0].length < 2) {
    result = {
      isError: true,
      response: {
        errors: result?.response?.errors
          ? [
              ...result.response.errors,
              {
                message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
              },
            ]
          : [
              {
                message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
              },
            ],
      },
    };
  }

  const validCases = ["SNAKE", "KEBAB", "CAMEL", "PASCAL", "UPPER"];
  const originalText = parts[0].slice(1);
  const params = new URLSearchParams(parts[1]);
  const targetCase = params.get("toCase");

  console.log(targetCase);

  if (!targetCase) {
    result = {
      isError: true,
      response: {
        errors: result?.response?.errors
          ? [
              ...result.response.errors,
              {
                message:
                  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
              },
            ]
          : [
              {
                message:
                  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
              },
            ],
      },
    };
  } else if (!validCases.includes(targetCase.toUpperCase())) {
    result = {
      isError: true,
      response: {
        errors: result?.response?.errors
          ? [
              ...result.response.errors,
              {
                message:
                  "This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.",
              },
            ]
          : [
              {
                message:
                  "This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.",
              },
            ],
      },
    };
  }

  if (!result.isError) {
    const originalCase = detectCase(originalText);
    const updatedText = toWords(originalText, originalCase);
    const convertedText = wordsToCase(updatedText, targetCase);

    result = {
      isError: false,
      targetCase: targetCase,
      originalCase: originalCase,
      originalText: originalText,
      convertedText: convertedText,
    };
  }

  return result;
}

module.exports = { parseUrl };
