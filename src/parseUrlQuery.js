function parseUrlQuery(urlQuery) {
  const [text, targetCase] = [urlQuery[0].slice(1), urlQuery[1]];
  const toCase = new URLSearchParams(targetCase).get('toCase');

  return {
    text,
    toCase,
  };
}

module.exports = { parseUrlQuery };
