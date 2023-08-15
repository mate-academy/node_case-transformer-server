
function getAndValidateUrl(requestUrl, host) {
  const url = new URL(requestUrl, `http://${host}`);

  const textToConvert = url.pathname.slice(1);
  const toCase = url.searchParams.get('toCase');

  const errorCollector = getErrorObject();

  if (textToConvert.length < 1) {
    errorCollector.addError('Text to convert is required. Correct request is: '
      + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  if (!toCase) {
    errorCollector.addError('"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  if (toCase && !['CAMEL', 'SNAKE', 'PASCAL', 'KEBAB', 'UPPER'].includes(toCase)) {
    errorCollector.addError('This case is not supported. Available cases:'
      + ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
  }

  if (errorCollector.getErrorsLength() !== 0) {
    throw new Error(JSON.stringify(errorCollector.message));
  }

  return { textToConvert, toCase };
}

function getErrorObject() {
  return {
    message: {
      errors: [],
    },
    addError: function(message) {
      this.message.errors.push({ message });
    },
    getErrorsLength() {
      return this.message.errors.length;
    },
  };
}

module.exports = {
  getAndValidateUrl,
};
