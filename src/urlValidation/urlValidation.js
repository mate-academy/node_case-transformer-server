function urlValidation(url) {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const [textToConvert, searchParams] = url.split('?');

  const errors = [];
  const params = new URLSearchParams(searchParams);
  const toCase = params.get('toCase');
  const normilizedText = textToConvert.slice(1);

  if (textToConvert.length < 2) {
    errors.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (!cases.includes(toCase) && toCase !== null) {
    errors.push({
      message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
    });
  }

  if (!searchParams) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  return { originalText: normilizedText, targetCase: toCase, errors };
}

module.exports = { urlValidation };
