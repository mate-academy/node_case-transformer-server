const http = require('http');
const { convertToCase } = require('./convertToCase');
const { postMessageError, validation } = require('./validation')


const PORT = process.env.PORT || 3000;

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const text = pathname.slice(1);
    const toCase = searchParams.get('toCase');
    const errorsMessage = validation(text, toCase);

    if (errorsMessage.length) {
      return postMessageError(res, 400, errorsMessage)
    }

    const { convertedText, originalCase } = convertToCase(text, toCase);

    const resBody = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    }
    res.statusCode = 200;
    res.end(JSON.stringify(resBody));
  });

  return server;
}

module.exports = {
  createServer,
}
