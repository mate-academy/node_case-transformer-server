function requestData(req) {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}/`);
  const inputText = pathname.slice(1);
  const toCase = searchParams.get('toCase');

  return { inputText, toCase };
}

module.exports = {
  requestData,
};
