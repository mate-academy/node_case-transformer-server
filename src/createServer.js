const createServer = () => {
  const http = require('http');
  const convertText = require('./convertText');
  // eslint-disable-next-line max-len
  const convertTextValidation = require('./convertTextValidation');

  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const prevText = url.pathname.slice(1);
    const caseName = url.searchParams.get('toCase');

    const errors = convertTextValidation(prevText, caseName);

    if (errors.length) {
      req.statusCode = 400;
      req.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertText(prevText, caseName);

    const requestData = JSON.stringify({
      ...convertedText,
      caseName,
      prevText,
    });

    res.end(requestData);
  });
};

module.exports = { createServer };
