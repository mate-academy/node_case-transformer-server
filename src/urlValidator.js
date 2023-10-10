const { REQUEST_EXAMPLE, AVALIABLE_STYLES } = require('./constants');

function urlValidator(textToConvert, style) {
  const noStyle = {
    message: `"toCase" query param is required. ${REQUEST_EXAMPLE}.`,
  };
  const noTextToConvert = {
    message: `Text to convert is required. ${REQUEST_EXAMPLE}.`,
  };
  const wrongStyle = {
    message: `This case is not supported. Available cases: ${AVALIABLE_STYLES.join(', ')}.`,
  };

  if (!textToConvert && !style) {
    return [noTextToConvert, noStyle];
  }

  if (!textToConvert && !AVALIABLE_STYLES.includes(style)) {
    return [noTextToConvert, wrongStyle];
  }

  if (!style) {
    return [noStyle];
  }

  if (!textToConvert) {
    return [noTextToConvert];
  }

  if (!AVALIABLE_STYLES.includes(style)) {
    return [wrongStyle];
  }
}

module.exports = {
  urlValidator,
};
