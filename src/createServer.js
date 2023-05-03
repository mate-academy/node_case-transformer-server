/* eslint-disable no-console */
const { convertToCase } = require('./convertToCase');
const { ErrorMessages } = require('./utils/ErrorMessages');
const http = require('http');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { url } = req;
    const urlSplit = url.split('?');
    const params = new URLSearchParams(urlSplit[1]);
    const textToConvert = urlSplit[0].slice(1);
    const toCase = params.get('toCase');

    const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errorsArr = [];

    try {
      if (!textToConvert) {
        errorsArr.push(ErrorMessages.noTextToConvert);
      }

      if (!toCase) {
        errorsArr.push(ErrorMessages.noCaseParam);
      }

      if (!caseNames.includes(toCase) && toCase) {
        errorsArr.push(ErrorMessages.notValidCase);
      }

      if (errorsArr.length !== 0) {
        throw new Error(JSON.stringify(errorsArr));
      }

      const convertedText = convertToCase(textToConvert, toCase);

      const responseToSend = {
        originalCase: convertedText.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: convertedText.convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify(responseToSend));
    } catch (error) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors: errorsArr }));
    }
  });
};

module.exports = {
  createServer,
};
