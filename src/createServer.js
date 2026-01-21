const http = require('node:http');

const { convertToCase } = require('./convertToCase/convertToCase');
const {
  CASES_ENUM,
  SEARCH_PARAM_ENUM,
  ERROR_MESSAGES,
  RESPONSE_KEYS,
} = require('./constant/enum');

const supportedCases = Object.keys(CASES_ENUM);

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedUrl.searchParams.get(SEARCH_PARAM_ENUM.TO_CASE);
    const textToConvert = normalizedUrl.pathname.split('/').at(1);

    if (!textToConvert) {
      errors.push({
        message: ERROR_MESSAGES.EMPTY_QUERY,
      });
    }

    if (!toCase) {
      errors.push({
        message: ERROR_MESSAGES.CASE_MISSING,
      });
    }

    if (toCase && !supportedCases.includes(toCase)) {
      errors.push({
        message: ERROR_MESSAGES.WRONG_CASE,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = ERROR_MESSAGES.BAD_REQUEST;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const transformedText = convertToCase(textToConvert, toCase);

    const responseObject = {
      [RESPONSE_KEYS.ORIGINAL_CASE]: transformedText.originalCase,
      [RESPONSE_KEYS.TARGET_CASE]: toCase,
      [RESPONSE_KEYS.ORIGINAL_TEXT]: textToConvert,
      [RESPONSE_KEYS.CONVERTED_TEXT]: transformedText.convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(responseObject));
  });

  return server;
};

module.exports = {
  createServer,
};
