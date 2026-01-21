const getParamsFrom = (request) => {
  const { pathname, searchParams } = new URL(request.url, `http://${request.headers.host}`);
  const text = pathname.slice(1);
  const toCase = searchParams.get('toCase');

  return [text, toCase];
};

module.exports = { getParamsFrom };
