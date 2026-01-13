const casesEn = {
  SNAKE: 'SNAKE',
  KEBAB: 'KEBAB',
  CAMEL: 'CAMEL',
  PASCAL: 'PASCAL',
  UPPER: 'UPPER',
};

const erEn = {
  NO_TEXT: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  NO_PARAM: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  NOT_SUPPORTED_CASE: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
};

module.exports = { casesEn, erEn };
