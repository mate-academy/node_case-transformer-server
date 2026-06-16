// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
// `/HELLO_WORLD?toCase=SNAKE`
const methods = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((request, response) => {
    const errors = [];

    response.statusCode = 200;
    // /meuTextoLindo?toCase=SNAKE

    const address = request.url.split('?');
    // [/meuTextoLindo, toCase=SNAKE]
    // [meuTextoLindo, toCase=SNAKE]
    const [textToConvert, query] = address;
    // [/meuTextoLindo, toCase=SNAKE]
    const textNormalized = textToConvert.startsWith('/')
      ? textToConvert.slice(1)
      : textToConvert;
    // meuTextoLindo

    const params = new URLSearchParams(query || '');
    const toCase = params.get('toCase');

    if (!textNormalized) {
      errors.push({
        message: `${'Text to convert is required.'} ${'Correct request is:'} "${'/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>'}".`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"${'toCase'}" ${'query param is required. Correct request is:'} "${'/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>'}".`,
      });
    } else if (!methods.includes(toCase)) {
      errors.push({
        message: `${'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.'}`,
      });
    }

    if (errors.length > 0) {
      response.statusCode = 400;
      response.setHeader('content-type', 'application/json');

      return response.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(textNormalized, toCase);
      const { originalCase, convertedText } = result;
      const o = {
        originalCase,
        targetCase: toCase,
        convertedText,
        originalText: textNormalized,
      };

      response.statusCode = 200;
      response.setHeader('content-type', 'application/json');

      return response.end(JSON.stringify(o));
    }
  });

  return server;
}

module.exports = { createServer };
