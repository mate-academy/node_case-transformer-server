/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
// const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase/convertToCase');
// const { wordsToCase } = require('./convertToCase/wordsToCase');
const PORT = process.env.PORT || 3006;

const isCaseCorrect = (caseName) => {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (cases.includes(caseName)) {
    return true;
  }

  return false;
};

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const errors = [];
    const data = {};

    res.setHeader('Content-Type', 'application/json');

    if (normalizedUrl.pathname === '/') {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
      // console.error('Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".')
    }

    const isToCaseParamExsists =
      'toCase' in Object.fromEntries(normalizedUrl.searchParams.entries());

    if (!isToCaseParamExsists) {
      errors.push({
        message: `\"toCase\" query param is required. Correct request is: \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".`,
      });
    }

    if (
      isToCaseParamExsists &&
      !isCaseCorrect(normalizedUrl.searchParams.get('toCase'))
    ) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      data.errors = errors;
      res.end(JSON.stringify(data));

      return;
    }

    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');
    const convertedData = convertToCase(originalText, targetCase);
    // console.log(normalizedUrl.searchParams.toCase)
    // data = {
    //   originalCase: convertedData.originalCase,
    //   targetCase,
    //   originalText,
    //   convertedText: convertedData.convertedText,
    // }

    // console.log('convertedWords', convertedData);
    // console.log(detectCase(originalText));
    res.statusCode = 200;
    // console.log(wordsToCase(wordsToConvert));

    res.end(
      JSON.stringify({
        originalCase: convertedData.originalCase,
        targetCase,
        originalText,
        convertedText: convertedData.convertedText,
      }),
    );
  });

  return server;
};

const server2 = createServer();

server2.listen(PORT, () => {
  // Ця функція виконується одразу після старту сервера
  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = {
  createServer,
};
