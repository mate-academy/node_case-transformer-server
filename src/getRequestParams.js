function getRequestParams(request) {
  const url = new URL(request.url, 'http://' + request.headers.host);
  const originalText = url.pathname.slice(url.pathname.lastIndexOf('/') + 1);
  const targetCase = url.searchParams.get('toCase');

  return { originalText, targetCase };
}

module.exports = { getRequestParams };
