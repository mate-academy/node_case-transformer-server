const parseRequest = (req) => {
  const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
  const originalText = normalizedUrl.pathname.slice(1);
  const targetCase = normalizedUrl.searchParams.get('toCase');

  return { originalText, targetCase };
};

module.exports = { parseRequest };
