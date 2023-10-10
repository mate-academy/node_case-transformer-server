const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { urlValidator } = require('./urlValidator.js');
const { SUCCESS, BAD_REQUEST } = require('./statusCodes.js');

function createServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(SUCCESS, { 'content-type': 'application/json' });

    const serverLink = `http://${req.headers.host}`;

    const normalisedUrl = new URL(req.url, serverLink);
    const textToConvert = normalisedUrl.pathname.slice(1);
    const style = normalisedUrl.searchParams.get('toCase');

    const errorMessage = urlValidator(textToConvert, style);

    if (errorMessage) {
      res.statusCode = BAD_REQUEST;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors: errorMessage,
      }));

      return;
    }

    const convertedText = convertToCase(textToConvert, style);

    const preparedResponse = {
      ...convertedText,
      originalText: textToConvert,
      targetCase: style,
    };

    res.end(JSON.stringify(preparedResponse));
  });

  // server.listen(PORT, () => {
  //   // eslint-disable-next-line
  //   console.log(`The server is running on ${serverLink}`);
  // });

  return server;
}

module.exports = {
  createServer,
};
