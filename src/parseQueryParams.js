function parseQueryParams(url) {
  const [path, queryString] = url.split('?');
  const params = new URLSearchParams(queryString);

  return { path, params };
}

module.exports = { parseQueryParams };
