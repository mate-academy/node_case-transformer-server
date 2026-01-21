const MISSING_TEXT = `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

const TO_CASE_MISSING = `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

const TO_CASE_INCORRECT = `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`;

module.exports = { MISSING_TEXT, TO_CASE_INCORRECT, TO_CASE_MISSING };
