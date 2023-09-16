const http = require('http');

const { detectCase } = require('./convertToCase/detectCase');
const { toWords } = require('./convertToCase/toWords');
const { wordsToCase } = require('./convertToCase/wordsToCase');
const { validateParams, convertUrlToParams } = require('./helper');

module.exports = {
  createServer: () => {
    return http.createServer((req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const { textToConvert, toCase } = convertUrlToParams(req.url);
      const validationErrors = validateParams(textToConvert, toCase);

      if (validationErrors.length) {
        res.statusCode = 400;
        res.status = 'Bad request';

        res.end(JSON.stringify({ errors: validationErrors }));
      } else {
        const originalCase = detectCase(textToConvert);
        const wordsArray = toWords(textToConvert, originalCase);
        const convertedText = wordsToCase(wordsArray, toCase);

        res.end(JSON.stringify({
          originalCase,
          targetCase: toCase,
          originalText: textToConvert,
          convertedText,
        }));
      }
    });
  },
};
