const getRequestData = (request) => {
  const { pathname, searchParams } = new URL(request.url, `http://${request.headers.host}`);
  const originalText = pathname.slice(1);
  const targetCase = searchParams.get('toCase');

  return [originalText, targetCase];
};

module.exports = {
  getRequestData,
};
