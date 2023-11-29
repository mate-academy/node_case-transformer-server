/* eslint-disable max-len */
const handleErrors = (urlText, urlCase, res) => {
  const errors = [];
  const avaivableCases = ['PASCAL', 'KEBAB', 'SNAKE', 'UPPER', 'CAMEL'];

  if (!urlText) {
    errors.push('Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  if (!urlCase) {
    errors.push('"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  } else {
    const isCaseValid = avaivableCases.includes(urlCase);

    if (!isCaseValid) {
      errors.push('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
    }
  }
  res.writeHead(400);

  const preparedErrors = errors.map(error => ({ message: error }));

  res.end(JSON.stringify({
    errors: preparedErrors,
  }));
};

module.exports = { handleErrors };
