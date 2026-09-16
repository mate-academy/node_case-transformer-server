const { createServer: Server, request } = require('node:http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return Server((req, res) => {
    // Leitura e processsamento inicial da URL.
    const [text, queryString] = req.url.split('?');
    const paramts = new URLSearchParams(queryString);
    const newText = text.slice(1);
    const toCase = paramts.get('toCase');

    // Validação dos dados antes de chamar convertToCase.
    const errors = [];
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!newText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    // Verificando se a requisição falhou.
    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      const errorsOfRequest = {
        errors: errors,
      };

      const requestErrorsFormated = JSON.stringify(errorsOfRequest);

      res.end(requestErrorsFormated);

      return;
    }

    // Verificando se a requisição foi bem sucedida.
    if (errors.length === 0) {
      const requestSucceed = convertToCase(newText, toCase);

      const succeed = {
        originalCase: requestSucceed.originalCase,
        targetCase: toCase,
        originalText: newText,
        convertedText: requestSucceed.convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.setHeader('Content-Type', 'application/json');

      const requestSucceedFormated = JSON.stringify(succeed);

      res.end(requestSucceedFormated);
    }
  });
}

module.exports = {
  createServer,
};
