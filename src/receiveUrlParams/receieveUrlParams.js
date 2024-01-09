const BASE = 'http://localhost:5700';

function receiveUrlParams(req) {
  const normilizedURl = new URL(req.url, BASE);
  const recivedCase = Object
    .fromEntries(normilizedURl.searchParams.entries());
  const recievedText = normilizedURl.pathname.slice(1);
  const { toCase } = recivedCase;

  return { recievedText, toCase };
}

module.exports = { receiveUrlParams };
