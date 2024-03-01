/* eslint-disable max-len */
function parseUrl(normalizedUrl) {
  const pathname = normalizedUrl.pathname;
  const inputCase = normalizedUrl.searchParams.get('toCase');
  let inputText;
  const errors = [];

  if (!pathname || pathname === '/') {
    errors.push({
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else {
    inputText = pathname.slice(1);
  }

  if (!inputCase) {
    errors.push({
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else {
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!availableCases.includes(inputCase.toUpperCase())) {
      errors.push({
        message: `This case is not supported. Available cases: ${availableCases.join(', ')}.`,
      });
    }
  }

  return {
    inputText,
    inputCase: inputCase ? inputCase.toUpperCase() : null,
    errors,
  };
}

module.exports = {
  parseUrl,
};
