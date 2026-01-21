function requestParse(url) {
  const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!url) {
    errors.push("URL mustn't be empty");
  }

  const [path, query] = url.split('?');
  const text = path.slice(1);
  const params = new URLSearchParams(query);
  const toCase = params.get('toCase');

  if (!text) {
    errors.push(
      // eslint-disable-next-line max-len
      'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  }

  if (!toCase) {
    errors.push(
      // eslint-disable-next-line max-len
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  } else if (!SUPPORTED_CASES.includes(toCase)) {
    errors.push(
      // eslint-disable-next-line max-len
      'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    );
  }

  return { errors, text, toCase };
}

module.exports = { requestParse };
