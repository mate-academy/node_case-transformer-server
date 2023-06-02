function getURL(requestURL) {
  const path = requestURL[0];
  const textToConvert = path.slice(1);
  const queryStr = requestURL[1];
  const params = new URLSearchParams(queryStr);
  const toCase = params.get('toCase');

  return { textToConvert, toCase };
}

module.exports = { getURL };
