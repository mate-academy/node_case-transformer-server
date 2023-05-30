function toSplitUrl(query) {
  const text = query[0].slice(1);
  const targetCase = query[1];

  const params = new URLSearchParams(targetCase);
  const toCase = params.get('toCase');

  return [text, toCase];
}

module.exports = {
  toSplitUrl,
};
