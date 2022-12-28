function getQueryInfo(req) {
  const partsUrl = req.url.split('?');
  const params = new URLSearchParams(partsUrl[1]);
  const toCase = params.get('toCase');
  const text = partsUrl[0].slice(1);

  return [text, toCase];
};

module.exports = {
  getQueryInfo,
};
