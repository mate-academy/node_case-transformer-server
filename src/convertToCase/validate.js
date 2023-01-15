function validate(originalText, targetCase) {
  let errors = []
  const VALID_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']

  if (!originalText?.length) {
    errors.push("Text to convert is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>")
  }

  if (!targetCase?.length) {
    errors.push("'toCase' query param is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>")
  } else if (!VALID_CASES.includes(targetCase?.toUpperCase())) {
    errors.push("This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER")
  }

  return errors
}

module.exports = {
  validate,
}
