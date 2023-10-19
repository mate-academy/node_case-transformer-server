const http = require("http");
const { convertToCase } = require("./convertToCase");



function createServer() {
  const server = http.createServer((req, res) => {
    const urlParams = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = urlParams.pathname.substring(1);
    const toCase = urlParams.searchParams.get("toCase");

    const errors = [];

    if (!textToConvert) {
      errors.push(
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
      );
    }

    if (!toCase) {
      errors.push(
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
      );
    } else {
      const supportedCases = ["SNAKE", "KEBAB", "CAMEL", "PASCAL", "UPPER"];

      if (!supportedCases.includes(toCase.toUpperCase())) {
        errors.push(
          "This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER."
        );
      }
    }

    if (errors.length > 0) {
      const errorResponse = {
        errors: errors.map((message) => ({ message })),
      };

      res.setHeader("Content-Type", "application/json");
      res.writeHead(400, "Bad Request");
      res.end(JSON.stringify(errorResponse));
      return;
    }

    const result = convertToCase(textToConvert, toCase);

    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = { createServer };
