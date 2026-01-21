const http = require('http');
const { convertToCase } = require('./convertToCase');

const parseUrl = (url) => {
  const [path, searchParams] = url.split('?');
  const params = new URLSearchParams(searchParams);
  const toCase = params.get('toCase');

  return [path.slice(1), toCase];
};

const validate = (textToConvert, toCase, errors) => {
  if (!textToConvert) {
    errors.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });

    return;
  }

  if (!['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'].includes(toCase)) {
    errors.push({
      message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
    });
  }
};

exports.createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [textToConvert, toCase] = parseUrl(req.url);
    const errors = [];

    validate(textToConvert, toCase, errors);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = `Bad request`;
      res.end(JSON.stringify({ errors: errors }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const converted = convertToCase(textToConvert, toCase);

    const result = {
      ...converted,
      originalText: textToConvert,
      targetCase: toCase,
    };

    res.end(JSON.stringify(result));
  });
};
