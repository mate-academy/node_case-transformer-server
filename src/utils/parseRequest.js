const parseRequest = (req) => {
  const [path, queryString] = req.url.split('?');

  const text = path.slice(1);
  const toCase = new URLSearchParams(queryString).get('toCase');

  return { text, toCase };
};

module.exports = { parseRequest };
