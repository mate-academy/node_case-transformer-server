function getDataFromUrl(url) {
  const [path, searchParams] = url.split('?');
  const textForTransform = (path || '').slice(1);
  const toCase = new URLSearchParams(searchParams || '').get('toCase');

  return { textForTransform, toCase };
}

module.exports = {
  getDataFromUrl,
};
