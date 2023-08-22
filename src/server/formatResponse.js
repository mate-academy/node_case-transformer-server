/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @typedef {object} ValidatedArguments
 * @property {string} text
 * @property {CaseName} toCase
 *
 * @typedef {object} Result
 * @property {CaseName} originalCase
 * @property {string} convertedText
 *
 * @typedef {object} Response
 * @property {CaseName} originalCase
 * @property {string} convertedText
 * @property {string} originalText
 * @property {CaseName} targetCase
 */
function formatResponse(args, result) {
  return {
    convertedText: result.convertedText,
    originalCase: result.originalCase,
    originalText: args.text,
    targetCase: args.toCase,
  };
}

module.exports = {
  formatResponse,
};
