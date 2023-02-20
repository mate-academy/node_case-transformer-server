const checkError = (text, caseName) => {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']
  const errorMessages = []

  if (!text) {
    errorMessages.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`
    })
  }

  if (!caseName) {
    errorMessages.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`
    })
  } else if (!cases.includes(caseName)) {
    errorMessages.push({ message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.` })
  }

  return errorMessages;
}

module.exports = {
  checkError
}
