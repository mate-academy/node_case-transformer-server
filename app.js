const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
const caseFromURL = normalizedURL.searchParams.get('toCase');
const textFromURL = normalizedURL.pathname.split('/')[1];
const selectedCase = detectCase(caseFromURL);
const errors = [];

res.setHeader('Content-Type', 'application/json');

if (!selectedCase || !textFromURL) {
  if (selectedCase === undefined && caseFromURL) {
    errors.push({
      // eslint-disable-next-line max-len
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (!caseFromURL) {
    errors.push({
      // eslint-disable-next-line max-len
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!textFromURL) {
    errors.push({
      // eslint-disable-next-line max-len
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  res.statusCode = 400;
  res.statusText = 'Bad request';
  res.end({ errors });
}

const {
  originalCase,
  convertedText,
} = convertToCase(textFromURL, caseFromURL);

res.statusCode = 200;
res.statusText = 'OK';

res.write({
  originalCase,
  targetCase: selectedCase,
  originalText: textFromURL,
  convertedText,
});
res.end();
