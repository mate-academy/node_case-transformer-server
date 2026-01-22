const errorEnum = {
  EMPTY_TEXT: 'EMPTY_TEXT',
  CASE_MISSING: 'toCASE_MISSING',
  CASE_NOT_VALID: 'toCASE_NOT_VALID',
};

const createErrorObject = (errorType) => {
  switch (errorType) {
    case errorEnum.EMPTY_TEXT:
      return {
        // eslint-disable-next-line
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      };

    case errorEnum.CASE_MISSING:
      return {
        // eslint-disable-next-line
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      };

    case errorEnum.CASE_NOT_VALID:
      return {
        // eslint-disable-next-line
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      };
  }
};

module.exports.errorEnum = errorEnum;
module.exports.createErrorObject = createErrorObject;
