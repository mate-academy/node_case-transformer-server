
const getUrlParameters = (text, query) => {
  const originalText = text.slice(1);

  const parameters = new URLSearchParams(query);
  const targetCase = parameters.get('toCase');

  return { originalText, targetCase };
};

module.exports = { getUrlParameters };
