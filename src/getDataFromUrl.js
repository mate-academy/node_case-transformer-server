function getDataFromUrl(req) {
  const urlInfo = new URL(req.url, `http://${req.headers.host}`);
  const textForTransform = urlInfo.pathname.slice(1);
  const toCase = urlInfo.searchParams.get('toCase');

  return { textForTransform, toCase };
}

module.exports = {
  getDataFromUrl,
};
