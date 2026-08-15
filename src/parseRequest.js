const parseRequest = (req) => {
  const [pathname, queryString = ''] = req.url.split('?');

  const text = pathname.slice(1);
  const toCase = new URLSearchParams(queryString).get('toCase');

  return { text, toCase };
};

module.exports = { parseRequest };
