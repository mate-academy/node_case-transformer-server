const http = require("http");
const { parseUrlForConversion } = require("./parseUrlForConversion/parseUrlForConversion");

const createServer = () =>
  http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    const parseResult = parseUrlForConversion(req.url);

    let data = '';

    if (parseResult.response.errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      data = parseResult.response;
      res.statusCode = 400;
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      data = {
        originalCase: parseResult.response.originalCase,
        targetCase: parseResult.response.targetCase,
        originalText: parseResult.response.originalText,
        convertedText: parseResult.response.convertedText,
      };
    }

    res.end(JSON.stringify(data));
  });

module.exports = { createServer };
