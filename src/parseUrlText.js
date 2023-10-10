function parseUrlText(url, host) {
  const normalizedURL = new URL(url, 'http://' + host);
  const params = normalizedURL.searchParams;
  const targetCase = params.get('toCase');
  const originalText = normalizedURL.pathname.slice(1);

  return { originalText, targetCase };
}

module.exports = { parseUrlText };
