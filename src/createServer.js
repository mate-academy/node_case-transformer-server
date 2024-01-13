const http = require("http");
const { convertToCase } = require("./convertToCase");
const {errorsValidation} = require("./errorsValidation");

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
      errorsValidation(isError, textToTransform, typeTransform, cases, errorMessages);
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
