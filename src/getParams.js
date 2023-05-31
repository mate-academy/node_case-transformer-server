function getParams(url, host) {
  const normalizedURL = new URL(url, `http://${host}`);
  const strQuery = normalizedURL.pathname.slice(1);
  const targetCase = normalizedURL.searchParams.get('toCase');

  return [strQuery, targetCase];
}

module.exports = { getParams };
