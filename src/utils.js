function parseRequestUrl(request) {
  const reqUrl = new URL(request.url, `http://${request.headers.host}`);
  const targetCase = reqUrl.searchParams.get('toCase');
  const originalText = reqUrl.pathname.slice(1);

  return { targetCase, originalText };
}

function validateData(targetCase, originalText) {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!originalText) {
    errors.push({
      // eslint-disable-next-line max-len
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    errors.push({
      // eslint-disable-next-line max-len
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!cases.includes(targetCase)) {
    errors.push({
      // eslint-disable-next-line max-len
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return { errors };
}

module.exports = {
  parseRequestUrl,
  validateData,
};
