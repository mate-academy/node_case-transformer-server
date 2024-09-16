const BASE = 'http://localhost:5700';

function receiveUrlParams(req) {
  const normilizedURl = new URL(req.url, BASE);
  const receivedCase = Object
    .fromEntries(normilizedURl.searchParams.entries());
  const receivedText = normilizedURl.pathname.slice(1);
  const { toCase } = receivedCase;

  return { receivedText, toCase };
}

module.exports = { receiveUrlParams };
