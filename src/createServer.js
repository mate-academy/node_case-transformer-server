const http = require("http");
const { convertToCase } = require("./convertToCase/convertToCase.js");
const { validator } = require("./validator.js");

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(
      req.url,
      `http://${req.headers.host}`
    );

    const originalText = pathname.slice(1);
    const targetCase = searchParams.get("toCase");
    const errors = validator(originalText, targetCase);

    const statusCode = errors.length ? 400 : 200;
    let response = { errors };

    if (!errors.length) {
      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase
      );

      response = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };
    }

    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  });

  return server;
}


module.exports = {
  createServer,
};
