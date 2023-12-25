const setCase = (url) => {
  const searchParams = new URLSearchParams(url.split('?')[1]);
  const neededCase = searchParams.get('toCase');

  return neededCase;
};

module.exports = { setCase };
