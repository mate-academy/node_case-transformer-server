function validateRequest(request) {
  let isSuccessfull = false;
  const errorMessages = [];
  let targetCase = '';
  let originalText = '';
  const types = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const checkText = request.slice(1).split('?')[0];

  if (!request || request === '/' || !checkText) {
    errorMessages.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else {
    originalText = checkText;
  }

  if (!request.includes('?toCase')) {
    errorMessages.push({
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  const urlForSearchParams = new URL(`https://nodejs.org${request}`);
  const params = { toCase: '' };

  urlForSearchParams.searchParams.forEach(
    (value, key) => (params[key] = value),
  );

  if (!types.includes(params.toCase) && request.includes('?toCase')) {
    errorMessages.push({
      message:
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  } else {
    targetCase = params.toCase;

    if (!errorMessages.length) {
      isSuccessfull = true;
    }
  }

  return {
    success: isSuccessfull,
    errors: { errors: errorMessages },
    targetCase,
    originalText,
  };
}

module.exports = {
  validateRequest,
};
