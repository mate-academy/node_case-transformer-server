/* eslint-disable max-len */
/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { detectCase } = require('./convertToCase/detectCase');

function createServer() {
  const err = { errors: [
    {
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    },
    {
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    },
    {
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    },
  ] };

  const kinds = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const responseObj = {
    originalCase: '',
    targetCase: '',
    originalText: '',
    convertedText: '',
  };

  return (
    http.createServer((req, res) => {
      let startUrl, endUrl;

      res.setHeader('Content-Type', 'application/json');
      endUrl = new URL(`http://localhost:5700${req.url}`);
      endUrl = endUrl.searchParams.get('toCase');

      if ((/^\/(.)+\?\w+=(SNAKE|KEBAB|CAMEL|PASCAL|UPPER)$/).test(req.url)) {
        startUrl = req.url.match(/(?<=\/)(.)*(?=\?)/);
        responseObj.originalCase = detectCase(startUrl[0]);
        responseObj.targetCase = endUrl;
        responseObj.originalText = startUrl[0];
        responseObj.convertedText = convertToCase(startUrl[0], endUrl).convertedText;
        res.statusCode = 200;
        res.statusText = 'OK';
        res.end(JSON.stringify(responseObj));

        return;
      }

      if ((/^\/\?toCase/).test(req.url) && (!kinds.includes(endUrl))) {
        res.statusText = 'Bad request';
        res.statusCode = 400;

        res.end(JSON.stringify(err));

        return;
      }

      if ((/^(\/\?)/).test(req.url)) {
        res.statusText = 'Bad request';
        res.statusCode = 400;

        const currenError = JSON.parse(JSON.stringify(err));

        currenError.errors = currenError.errors.splice(0, 1);
        res.end(JSON.stringify(currenError));

        return;
      }

      if (!(req.url.includes('toCase'))) {
        res.statusText = 'Bad request';
        res.statusCode = 400;

        if ((/^\/\w+$/).test(req.url)) {
          const currenError = JSON.parse(JSON.stringify(err));

          currenError.errors = currenError.errors.slice(1, 2);
          res.end(JSON.stringify(currenError));

          return;
        }

        if ((/^\/$/).test(req.url)) {
          const currenError = JSON.parse(JSON.stringify(err));

          currenError.errors.pop();

          res.end(JSON.stringify(currenError));

          return;
        }

        return;
      }

      if ((!kinds.includes(endUrl))) {
        res.statusText = 'Bad request';
        res.statusCode = 400;

        const currenError = JSON.parse(JSON.stringify(err));

        currenError.errors = currenError.errors.slice(2);
        res.end(JSON.stringify(currenError));

        return;
      }


    }));
}
module.exports = { createServer };
