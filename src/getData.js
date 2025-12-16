function getData(request) {
  const prettyUrl = new URL(request.url, `http://${request.headers.host}/`);

  const { pathname, searchParams } = prettyUrl;
  const caseName = searchParams.get('toCase');
  const textToConvert = pathname.slice(1);

  return [textToConvert, caseName];
}

module.exports = {
  getData,
};
