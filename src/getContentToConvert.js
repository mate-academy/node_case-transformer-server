function getContentToConvert(string) {
  const startIndex = string.indexOf('/') + 1;
  const endIndex = string.indexOf('?');

  if (startIndex === -1) {
    return null;
  }

  if (endIndex === -1) {
    return string.substring(startIndex);
  }

  return string.substring(startIndex, endIndex);
}

module.exports = { getContentToConvert };
