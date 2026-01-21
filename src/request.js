const { convertToCase } = require('./convertToCase/convertToCase');
const { detectCase } = require('./convertToCase/detectCase');

const BASE = 'http://localhost:5700';

function request(req, res) {
  const normalizedUrl = new URL(req.url, BASE);

  const text = normalizedUrl.pathname.slice(1);
  const caseToConvert = normalizedUrl.searchParams.get('toCase');

  if (!text && !caseToConvert) {
    res.writeHead(400, { 'content-type': 'application/json' });

    res.end(
      JSON.stringify({
        errors: [
          {
            message:
              'Text to convert is required. ' +
              'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
          {
            message:
              '"toCase" query param is required. ' +
              'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
        ],
      }),
    );

    return;
  }

  if (!text && caseToConvert) {
    res.writeHead(400, { 'content-type': 'application/json' });

    if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(caseToConvert)
    ) {
      res.end(
        JSON.stringify({
          errors: [
            {
              message:
                'This case is not supported. ' +
                'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            },
            {
              message:
                'Text to convert is required. ' +
                'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
          ],
        }),
      );

      return;
    }

    res.end(
      JSON.stringify({
        errors: [
          {
            message:
              'Text to convert is required. ' +
              'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
        ],
      }),
    );

    return;
  }

  if (text && !caseToConvert) {
    res.writeHead(400, { 'content-type': 'application/json' });

    res.end(
      JSON.stringify({
        errors: [
          {
            message:
              '"toCase" query param is required. ' +
              'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
        ],
      }),
    );

    return;
  }

  if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(caseToConvert)) {
    res.writeHead(400, { 'content-type': 'application/json' });

    res.end(
      JSON.stringify({
        errors: [
          {
            message:
              'This case is not supported. ' +
              'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
          },
        ],
      }),
    );

    return;
  }

  // if (text && caseToConvert) {
  //   const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  //
  //   if (!availableCases.includes(caseToConvert)) {
  //     res.writeHead(400, { 'content-type': 'application/json' });
  //
  //     res.end(
  //       JSON.stringify({
  //         errors: [
  //           {
  //             message:
  //               'This case is not supported. Available cases: ' +
  //               availableCases.join(', ') +
  //               '.',
  //           },
  //         ],
  //       }),
  //     );
  //   }
  //
  //   return;
  // }

  try {
    const { convertedText } = convertToCase(text, caseToConvert);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        convertedText: convertedText,
        originalCase: detectCase(text),
        originalText: text,
        targetCase: caseToConvert,
      }),
    );
  } catch (err) {
    res.writeHead(400, { 'content-type': 'application/json' });

    res.end(
      JSON.stringify({
        errors: [err.message || 'Unknown error'],
      }),
    );
  }
}

module.exports = { request };
