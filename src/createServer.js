const { createServer } = require('http');
const { convertToCase } = require('./convertToCase/index');

const PORT = process.env.PORT || 5700;

const server = createServer((req, res) => {
  const messages = {
    errors: [],
  };
  const reqUrl = new URL(req.url, `http://localhost:${req.socket.localPort}`);
  const textToTransform = reqUrl.pathname.slice(1);
  const toCase = reqUrl.searchParams.get('toCase');

  if (!textToTransform) {
    messages.errors.push({
      message:
        // eslint-disable-next-line max-len
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
    });
  }

  if (!toCase) {
    messages.errors.push({
      message:
        // eslint-disable-next-line max-len
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
    });

    if (!['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'].includes(toCase)) {
      messages.errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }
  }

  if (messages.errors.length !== 0) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ errors: messages.errors }));

    return;
  }

  try {
    const { originalCase, convertedText } = convertToCase(
      textToTransform,
      toCase,
    );

    const goodRespBody = {
      originalCase,
      targetCase: toCase,
      originalText: textToTransform,
      convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(goodRespBody));
  } catch {
    res.statusCode = 500;

    res.end(
      JSON.stringify({
        errors: [{ message: 'An error occurred during processing.' }],
      }),
    );
  }
});

module.exports = {
  createServer: server,
  PORT,
};
