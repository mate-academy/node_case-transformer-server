const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const noTextError = {
  message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
};
const inappropriateCaseError = {
  message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
};

const noQueryParamsError = {
  message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
};

const MIN_ALLOWED_LENGTH = 2;

function urlValidation(url) {
  const [textToConvert, searchParams] = url.split('?');

  const errors = [];
  const params = new URLSearchParams(searchParams);
  const toCase = params.get('toCase');
  const normalizedText = textToConvert.slice(1);
  const noTextWasProvided = textToConvert.length < MIN_ALLOWED_LENGTH;

  if (noTextWasProvided) {
    errors.push(noTextError);
  }

  if (!cases.includes(toCase) && toCase !== null) {
    errors.push(inappropriateCaseError);
  }

  if (!searchParams) {
    errors.push(noQueryParamsError);
  }

  return { originalText: normalizedText, targetCase: toCase, errors };
}

module.exports = { urlValidation };
