const http = require("http");
const {convertToCase} = require("./convertToCase");

const convert = ({ originalText, targetCase }) => {
  return convertToCase(originalText, targetCase)
}

const urlPattern = `\"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".`

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, 'http://localhost:5700');
    const text = normalizedURL.pathname.slice(1);
    let caseName = '';
    let result = {};
    const errors = [];

    try {
      caseName = normalizedURL.searchParams.get('toCase').toUpperCase();
    } catch (e) {
      errors.push(`"toCase" query param is required. Correct request is: ${urlPattern}`);
    }

    if (text === '') {
      errors.push(`Text to convert is required. Correct request is: ${urlPattern}`);
    }


    if (caseName) {
      try {
        const dataToConvert = {
          originalText: text,
          targetCase: caseName
        };

        const converted = convert(dataToConvert);

        result = { ...dataToConvert, ...converted }
      } catch (e) {
        errors.push('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
      }
    }


    res.setHeader("Content-Type", "application/json");

    if (!errors.length) {
      res.end(JSON.stringify(result))
    } else {
      res.writeHead(400);
      res.end(JSON.stringify({
        "errors": errors.map(error => (    {
          "message": error
        })),
      }))
    }
  })

}

module.exports = { createServer }
