const getParameters = (url, hosts) => {
  const { pathname, searchParams } = new URL(url, hosts);
  const text = pathname.slice(1);
  const toCase = searchParams.get('toCase');

  return { text, toCase };
};

module.exports = getParameters;
