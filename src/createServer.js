const http = require('node:http');
const { validateData } = require('./validateData.js');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  return http.createServer((req, res) => {
    // const url = new URL(req.url, `http://${req.headers.host}`);
    const [path, searchParams] = req.url.split('?');

    const textToConvert = path.slice(1);
    const toCase = new URLSearchParams(searchParams)
      .get('toCase')
      ?.toUpperCase();

    const [isCorrect, errors] = validateData(textToConvert, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (isCorrect) {
      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        toCase,
      );

      const body = {
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.write(JSON.stringify(body));
    } else {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.write(JSON.stringify(errors));
    }

    res.end();
  });
}

// const server = serverInit();

// server.listen(3000, () => {
//   console.log(`Server is running on port ${3000}`);
// });

module.exports = {
  createServer,
};
