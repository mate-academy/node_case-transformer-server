const http = require("http");
const { convertToCase } = require("./convertToCase");

const cases = ["SNAKE", "KEBAB", "CAMEL", "PASCAL", "UPPER"];

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const textToTransform = normalizedUrl.pathname.slice(1);
    const typeTransform = normalizedUrl.searchParams.get('toCase');

    const isError =
      !textToTransform || !typeTransform || !cases.includes(typeTransform);

    const errorMessages = {
      errors: [],
    };

    if (isError) {
      if (!textToTransform) {
        errorMessages.errors.push({
          message:
            'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!typeTransform) {
        errorMessages.errors.push({
          message:
            '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!cases.includes(typeTransform) && typeTransform) {
        errorMessages.errors.push({
          message:
            `This case is not supported. Available cases: ${cases.join(', ')}.`,
        });
      }

      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errorMessages));
    } else {
      const { originalCase, convertedText } = convertToCase(
        textToTransform,
        typeTransform,
      );

      const response = {
        originalCase,
        targetCase: typeTransform,
        originalText: textToTransform,
        convertedText,
      };

      res.statusCode = 200;

      res.statusMessage = 'OK';
      res.end(JSON.stringify(response));
    }
  });

  return server;
};


module.exports = { createServer };


