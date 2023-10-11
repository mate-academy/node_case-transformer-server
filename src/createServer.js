const http = require('http');

function vadidation(text, toCase) {
  const cR = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';
  const textE = 'Text to convert is required. ' + cR;
  const toCaseE = '"toCase" query param is required. ' + cR;
  const caseE = `This case is not supported.
    Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER`;

  const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errorObj = {
    errors: [
      {
        message: '<SPECIFIC MESSAGE TEXT HERE>',
      },
    ],
  };

  if (text.trim().length < 1) {
    errorObj.errors.push({ message: textE });
  }

  if (toCase.trim().length < 1) {
    errorObj.errors.push({ message: toCaseE });
  }

  if (!caseTypes.includes(toCase)) {
    errorObj.errors.push({ message: caseE });
  }

  return errorObj;
}

function createServer() {
  const convertToCase = require('./convertToCase/convertToCase').convertToCase;

  const PORT = process.env.PORT || 3000;

  const server = http.createServer((req, res) => {
    // headers should be set before sending data
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    const text = req.url.split('?')[0];
    const queryString = req.url.split('?')[1];
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    req.on('error', (error) => {
      // handles an error
      throw new Error(error);
    });

    if (vadidation(text, toCase).errors.length > 0) {
      res.status(400).end(vadidation());
    }

    // finishes the response
    res.status(200).end(convertToCase(text, toCase));
  });

  // enables the server
  server.listen(PORT, () => {});
}

module.exports = {
  createServer,
};
