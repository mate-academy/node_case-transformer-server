const parseUrl = (req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const originalText = url.pathname.slice(1);
  const targetCase = url.searchParams.get('toCase');

  return { originalText, targetCase };
};

module.exports = {
  parseUrl,
};
