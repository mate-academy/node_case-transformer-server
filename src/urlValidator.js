const { REQUEST_EXAMPLE, AVALIABLE_STYLES } = require('./constants');

const errorValidationMessages = {
  noStyle: `"toCase" query param is required. ${REQUEST_EXAMPLE}.`,
  noTextToConvert: `Text to convert is required. ${REQUEST_EXAMPLE}.`,
  wrongStyle: `This case is not supported. Available cases: ${AVALIABLE_STYLES.join(', ')}.`,
};

function urlValidator(textToConvert, style) {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: errorValidationMessages.noTextToConvert,
    });
  }

  if (!style) {
    errors.push({
      message: errorValidationMessages.noStyle,
    });
  }

  if (!AVALIABLE_STYLES.includes(style) && style) {
    errors.push({
      message: errorValidationMessages.wrongStyle,
    });
  }

  return errors;
}

module.exports = {
  urlValidator,
};
