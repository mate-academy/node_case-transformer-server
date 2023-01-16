function parseHttpRequest(request) {
  const [pathname, queryString] = request.url.split('?');
  const originalText = pathname.slice(1);
  const searchParams = new URLSearchParams(queryString);
  const targetCase = searchParams.get('toCase');

  return { targetCase, originalText };
}

module.exports = { parseHttpRequest };
