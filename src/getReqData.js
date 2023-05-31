const getReqData = (req) => {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const text = pathname.slice(1);
  const caseName = searchParams.get('toCase');

  return { text, caseName };
};

module.exports = {
  getReqData,
};
