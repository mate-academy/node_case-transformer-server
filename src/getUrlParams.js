const getUrlParams = (req) => {
  const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
  const textToConvert = normalizedUrl.pathname.slice(1);
  const caseToConvert = normalizedUrl.searchParams.get('toCase');

  return { textToConvert, caseToConvert };
};

module.exports = { getUrlParams };
