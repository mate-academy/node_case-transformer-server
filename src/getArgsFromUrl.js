const BASE = 'http://localhost:5701';

const getArgsFromUrl = (url) => {
  const reqUrl = new URL(url, BASE);
  const originalText = reqUrl.pathname.slice(1);
  const targetCase = reqUrl.searchParams.get('toCase');

  return {
    originalText,
    targetCase,
  };
};

module.exports = { getArgsFromUrl };
