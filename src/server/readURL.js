const readURL = (req) => {
  const normalizedURL = new URL(req.url, `https://${req.headers.host}`);
  const text = normalizedURL.pathname.slice(1);
  const toCase = normalizedURL.searchParams.get('toCase');

  return {
    text,
    toCase,
  };
};

module.exports = { readURL };
