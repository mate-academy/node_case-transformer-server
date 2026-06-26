function getRequestData(url) {
  const normalizedUrl = new URL(url, 'http://localhost:5800');

  const targetCase = normalizedUrl.searchParams.get('toCase');
  const originalText = normalizedUrl.pathname.slice(1);

  return { targetCase, originalText };
}

module.exports = { getRequestData };
