const http = require("http");
const { parseUrl } = require("./parseUrl/parseUrl");

const createServer = () =>
  http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    const parseResult = parseUrl(req.url);

    let data;

    if (parseResult.isError) {
      data = JSON.stringify(parseResult.response);
      res.statusCode = 400;
    } else {
      data = JSON.stringify({
        originalCase: parseResult.originalCase,
        targetCase: parseResult.targetCase,
        originalText: parseResult.originalText,
        convertedText: parseResult.convertedText,
      });

      res.statusCode = 200;
    }

    res.end(data);
  });

module.exports = { createServer };
