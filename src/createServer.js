const http = require('http');

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

    const cR = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';
    const textE = 'Text to convert is required. ' + cR;
    const toCaseE = '"toCase" query param is required. ' + cR;
    const caseE = `This case is not supported.
      Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER`;

    const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (text.trim().length < 1) {
      throw new Error(textE);
    }

    if (toCase.trim().length < 1) {
      throw new Error(toCaseE);
    }

    if (!caseTypes.includes(toCase)) {
      throw new Error(caseE);
    }

    // sends a portion of data
    res.write('<h1>Hello, world!</h1>');
    res.write('next portion of data');
    res.write('one more portion of data');
    res.write(convertToCase(text, toCase));

    // finishes the response
    res.end('the last portion of data');
  });

  // enables the server
  server.listen(PORT, () => {
    // console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = {
  createServer,
};
