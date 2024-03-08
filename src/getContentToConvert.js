function getContentToConvert(string) {
  const startIndex = string.indexOf('/') + 1;
  const endIndex = string.indexOf('?');

  if (startIndex === -1 || endIndex === -1) {
    return null;
  }

  return string.substring(startIndex, endIndex);
}

module.exports = { getContentToConvert };
