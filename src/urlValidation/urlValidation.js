function urlValidation(url) {
  const [textToConvert, searchParams] = url.split('?');

  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errors = [];
  const params = new URLSearchParams(searchParams);
  const toCase = params.get('toCase');
  const normilizedText = textToConvert.slice(1);

  /*   if (!cases.includes(toCase)) {
    errors.push({
      errors: [
        {
          message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
        },
      ],
    });
  } */

  if (textToConvert.length < 2) {
    errors.push({
      errors: [
        {
          message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        },
      ],
    });
  }

  if (!searchParams) {
    errors.push({
      errors: [
        {
          message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        },
      ],
    });
  }

  return { originalText: normilizedText, targetCase: toCase, errors };
}

module.exports = { urlValidation };
