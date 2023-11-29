const http = require('http');
const { validate } = require('./validation');
const { resetPrevCase } = require('./resetPrevCase');
const { transformText } = require('./transformText');

const createServer = () => http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;

  const normalizedUrl = new URL(req.url, 'http://localhost:5700');
  const textToEdit = normalizedUrl.pathname.slice(1);
  const param = normalizedUrl.searchParams.get('toCase');

  const errorsMessages = validate(textToEdit, param);

  if (errorsMessages.errors.length) {
    res.statusCode = 400;
    res.statusMessage = 'Bad request';
    res.end(JSON.stringify(errorsMessages));

    return;
  }

  const [resetedText, prevCase] = resetPrevCase(textToEdit);

  const textToReturn = transformText(resetedText, param);

  const result = {
    originalCase: prevCase,
    targetCase: param,
    originalText: textToEdit,
    convertedText: textToReturn,
  };

  res.end(JSON.stringify(result));
});

module.exports = { createServer };
