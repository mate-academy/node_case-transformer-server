function data(request) {
    const normalizedUrl = new URL(request.url, `http://${request.headers.host}/`);
  
    const { pathname, searchParams } = normalizedUrl;
    const text = pathname.slice(1);
    const toCase = searchParams.get('toCase');
  
    return { text, toCase };
  }
  
  module.exports = {
    data,
  };