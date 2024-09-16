const searchParams = (request) => {
  const text = request.split('?')[0].slice(1);
  const query = request.split('?')[1];
  const params = new URLSearchParams(query);
  const toCase = params.get('toCase');

  return [text, toCase];
};

module.exports = {
  searchParams,
};
