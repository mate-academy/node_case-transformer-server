/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const url = require('url');
const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const responseData = {};

    const normalizedURL = new url.URL(
      request.url,
      `http://${request.headers.host}`,
    );

    const searchParams = normalizedURL.searchParams;

    const textToConvert = normalizedURL.pathname.slice(1);
    const targetCase = searchParams.get('toCase');

    // If no 'text to convert', set error in errors array
    if (!textToConvert.length) {
      responseData.errors = [
        {
          message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        },
      ];
    }

    // If no toCase query param
    if (!searchParams.has('toCase')) {
      // If there's no errors array, declare it
      if (!Array.isArray(responseData.errors)) {
        responseData.errors = [];
      }

      responseData.errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });

      // If Case not supported -> Append error
    } else if (!supportedCases.includes(targetCase)) {
      if (!Array.isArray(responseData.errors)) {
        responseData.errors = [];
      }

      responseData.errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    // If no errors -> Convert the text
    if (!('errors' in responseData)) {
      responseData.originalCase = detectCase(textToConvert);

      responseData.targetCase = targetCase;

      responseData.originalText = textToConvert;

      responseData.convertedText = convertToCase(
        textToConvert,
        targetCase,
      ).convertedText;

      response.statusCode = 200;
      response.statusMessage = 'OK';
    } else {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
    }

    // {
    //   "originalCase": "CASE_NAME",
    //   "targetCase": "CASE_NAME",
    //   "originalText": "ORIGINAL_TEXT",
    //   "convertedText": "CONVERTED_TEXT"
    // }

    // response.write(`<h1>Siema</h1> \n\n\n`);

    response.end(JSON.stringify(responseData));
  });

  server.on('error', (error) => {
    console.log(error.message);
  });

  return server;
};

module.exports = {
  createServer,
};
