const errorMessage = {
  textIsMissing: 'Text to convert is required. '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseIsMissing: '"toCase" query param is required. Correct request is: "/'
  + '<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  valueIsNotFromListed: 'This case is not supported. Available '
  + 'cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validation = (text, query) => {
  const errors = [];

  if (text === '/') {
    errors.push({ message: errorMessage.textIsMissing });
  }

  if (!query.search) {
    errors.push({ message: errorMessage.caseIsMissing });
  }

  if (!caseName.includes(query.searchParams.get('toCase')) && query.search) {
    errors.push({ message: errorMessage.valueIsNotFromListed });
  }

  return errors;
};

module.exports = { validation };
