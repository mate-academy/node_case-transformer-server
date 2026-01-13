const http = require('http');
const v = require('./validateRequest');
const c = require('./convert');
const n = require('./normalize');
const PORT = process.env.PORT || 5700;

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://localhost:${PORT}`);

    const validated = v.validateRequest(normalizedUrl);

    res.setHeader('Content-Type', 'application/json');

    if (!validated.ok) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors: validated.data }));

      return;
    }

    const { originalCase, targetCase, originalText } = validated.data;
    const normToTransform = n.normalize[originalCase](originalText);

    const response = {
      originalCase,
      targetCase,
      originalText,
      convertedText: c.convert[targetCase](normToTransform),
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(response));
  });
}

module.exports = { createServer };
