module.exports = {
  detectErrors,
};

/* eslint max-len: "warn" */
const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const correctRequest
  = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const messages = {
  textNeed: 'Text to convert is required.'.concat(' ', correctRequest),
  caseNeed: '"toCase" query param is required.'.concat(' ', correctRequest),
  caseWrong: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

/**
 * @param {{originalText: string, targetCase: string}}
 * @return {{message: string}[]}
*/
function detectErrors({
  originalText,
  targetCase,
}) {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: messages.textNeed,
    });
  }

  if (!targetCase) {
    errors.push({
      message: messages.caseNeed,
    });
  } else if (!caseNames.includes(targetCase)) {
    errors.push({
      message: messages.caseWrong,
    });
  }

  return errors;
}
