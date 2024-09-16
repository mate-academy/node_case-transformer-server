function getData(request) {
  const normalizedUrl = new URL(request.url, `http://${request.headers.host}/`);

  const { pathname, searchParams } = normalizedUrl;
  const textToConvert = pathname.slice(1);
  const caseName = searchParams.get('toCase');

  return [textToConvert, caseName];
}

module.exports = {
  getData,
};
