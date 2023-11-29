/* eslint-disable max-len */
function handleError(urlText, urlCase, res) {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const error = { errors: [] };

  function additionalMethods(err) {
    res.statusCode = 400;

    res.end(JSON.stringify(
      err,
    ));
  };

  if (!urlText && !urlCase) {
    error.errors.push(
      { message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
      { message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
    );

    return additionalMethods(error);
  };

  if (!urlText && !cases.includes(urlCase)) {
    error.errors.push(
      { message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
      { message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
    );

    return additionalMethods(error);
  }

  if (!urlText) {
    error.errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });

    return additionalMethods(error);
  }

  if (!cases.includes(urlCase) && urlCase) {
    error.errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });

    return additionalMethods(error);
  }

  if (!urlCase) {
    error.errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });

    return additionalMethods(error);
  }
};

module.exports = { handleError };
