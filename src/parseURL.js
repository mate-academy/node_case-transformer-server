const parseURL = (url, host) => {
  const normalizedURL = new URL(url, `http://${host}`);
  const stringCase = normalizedURL.searchParams.get('toCase');
  const queryString = normalizedURL.pathname.slice(1);

  return { stringCase, queryString };
};

module.exports.parseURL = parseURL;
