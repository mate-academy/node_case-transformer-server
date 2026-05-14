const { convertToCase } = require('../convertToCase');
const {
  validateConvertRequest,
} = require('../convertRequest/validateConvertRequest');
const { parseConvertUrl } = require('./parseConvertUrl');

/**
 * Parse URL, validate, respond with JSON (success body or `{ errors }`).
 *
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
function handleCaseTransformRequest(req, res) {
  const { text, toCase } = parseConvertUrl(req);
  const data = validateConvertRequest({ text, toCase });

  res.statusCode = data.statusCode;
  res.statusMessage = data.statusMessage;

  if (data.statusCode === 400) {
    res.end(JSON.stringify({ errors: data.errors }));

    return;
  }

  const result = convertToCase(text, toCase);

  result.targetCase = toCase;
  result.originalText = text;

  res.end(JSON.stringify(result));
}

module.exports = {
  handleCaseTransformRequest,
};
