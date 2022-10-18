const http = require("http");
const { convertToCase } = require("./convertToCase/convertToCase");

function createServer() {
  const server = http.createServer((req, res) => {
    const normalized = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader("Content-Type", "application/json");

    const { pathname, searchParams } = normalized;
    const originalText = pathname.slice(1);
    const caseParams = searchParams.toString().split("=");
    const targetCase = caseParams[1];
    const cases = ["SNAKE", "PASCAL", "CAMEL", "KEBAB", "UPPER"];
    const errors = [];
    const errorValues = [
      {
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      },
      {
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      },
      {
        message:
          "This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.",
      },
    ];


    if (originalText === "") {
      errors.push(errorValues[0]);
    }

    if (caseParams[0] !== "toCase") {
      console.log('not toCases')
      errors.push(errorValues[1]);
      console.log(errors)
    } else if (!cases.includes(targetCase) ) {
      errors.push(errorValues[2]);
    }

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
      return;
    }
    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase
    );

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      })
    );
  });

  return server;
}

module.exports = { createServer };
