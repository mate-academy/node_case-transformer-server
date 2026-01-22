const http = require("http");
const { convertToCase } = require("./convertToCase");

function createServer() {
  return http.createServer((req, res) => {
    const cases = ["SNAKE", "PASCAL", "CAMEL", "KEBAB", "UPPER"];
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader("Content-Type", "application/json");

    const originalText = pathname.slice(1);
    const caseParams = searchParams.toString().split("=");
    const targetCase = caseParams[1];
    const errors = [];
    const errorsMap = {
      textToConvertIsRequired:{
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      },
      toCaseQueryParamIsRequired:{
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      },
      caseIsNotSupported:{
        message:
          "This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.",
      },
    };


    if (!originalText) {
      errors.push(errorsMap.textToConvertIsRequired);
    }

    if (caseParams[0] !== "toCase") {
      errors.push(errorsMap.toCaseQueryParamIsRequired);
    } else if (!cases.includes(targetCase) ) {
      errors.push(errorsMap.caseIsNotSupported);
    }
    console.log(errors)

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
}

module.exports = { createServer };