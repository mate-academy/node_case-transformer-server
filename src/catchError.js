const toCases = [
  'SNAKE',
  'KEBAB',
  'CAMEL',
  'PASCAL',
  'UPPER',
];

function catchError(text, textCase) {
  const errors = [];
  const requestExample = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';

  if (!text) {
    errors.push({
      message: `Text to convert is required. Correct request is: ${requestExample}.`,
    });
  }

  if (!textCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: ${requestExample}.`,
    });
  }

  if (textCase && !toCases.includes(textCase)) {
    errors.push({
      message: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = { catchError };
