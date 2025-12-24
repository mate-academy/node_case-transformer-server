function toSplitUrl(query) {
  const [text, targetCase] = query;

  const params = new URLSearchParams(targetCase);
  const toCase = params.get('toCase');

  return [text.slice(1), toCase];
}

module.exports = {
  toSplitUrl,
};
