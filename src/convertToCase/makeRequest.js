const { readUrlParams, validateUrlParams }
  = require('./readAndValidateUrlParams');
const { convertToCase } = require('./convertToCase');

const makeRequest = (req, res) => {
  res.setHeader('Content-type', 'application/json');

  try {
    const { text, caseName } = readUrlParams(req.url);

    validateUrlParams(text, caseName);

    const convertedText = convertToCase(text, caseName);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: convertedText.originalCase,
        targetCase: caseName,
        originalText: text,
        convertedText: convertedText.convertedText,
      }),
    );
  } catch (errors) {
    res.statusCode = 400;
    res.statusMessage = 'Bad request';

    res.end(JSON.stringify({ errors }));
  }
};

module.exports = {
  makeRequest,
};
