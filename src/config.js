const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

module.exports = { cases };

module.exports = {
  errors: {
    textIsMissing: {
      message: 'Text to convert is required. Correct request is:'
       + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    },
    toCaseIsMissing: {
      message: '"toCase" query param is required. Correct request is:'
      + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    },
    toCaseIsWrong: {
      message: `This case is not supported. Available cases: ${cases.join(', ')}.`,
    },
  },
  getRequestParams: (req) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const { pathname, searchParams } = normalizedUrl;

    const originalText = pathname.slice(1);
    const caseParams = searchParams.toString().split('=');
    const targetCase = caseParams[1];

    return { originalText, caseParams, targetCase };
  },
};
