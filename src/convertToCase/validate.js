function validate(textToConvert, caseToConvert) {
  let errors = []
  const VALID_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']

  if (!textToConvert?.length) {
    errors.push("Text to convert is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>")
  }

  if (!caseToConvert?.length) {
    errors.push("'toCase' query param is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>")
  } else if (!VALID_CASES.includes(caseToConvert?.toUpperCase())) {
    errors.push("This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER")
  }

  return errors
}

module.exports = {
  validate,
}
