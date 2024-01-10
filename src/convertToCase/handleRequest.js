const { paramsValidation } = require('./paramsValidation');
const { convertToCase } = require('./convertToCase');
const { parseUrl } = require('./parseUrl');

const handleRequest = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    const { text, caseName } = parseUrl(req.url);

    paramsValidation(text, caseName);

    const result = convertToCase(text, caseName);

    res.writeHead(200, 'OK');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: caseName,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  } catch (errors) {
    res.writeHead(400, 'Bad Request');
    res.end(JSON.stringify({ errors }));
  }
};

module.exports = {
  handleRequest,
};
