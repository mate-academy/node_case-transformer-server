/* eslint-disable prettier/prettier */
const en = require('./enums');
const dc = require('./detectCase');

function validateRequest(req) {
  const errors = [];
  const reqPhrase = req.pathname.slice(1);

  if (reqPhrase === '') {
    errors.push({ message: en.erEn.NO_TEXT });
  }

  const reqCase = req.searchParams.get('toCase');

  if (!reqCase) {
    errors.push({ message: en.erEn.NO_PARAM });
  } else if (!Object.values(en.casesEn).some((el) => el === reqCase)) {
    errors.push({ message: en.erEn.NOT_SUPPORTED_CASE });
  }

  if (errors.length !== 0) {
    return { ok: false, data: errors };
  }

  const res = dc.detectCase(reqPhrase);

  return res.ok
    ? {
      ok: true,
      data: {
        originalCase: res.originalCase,
        targetCase: reqCase,
        originalText: reqPhrase,
      },
    }
    : res;
}

module.exports = { validateRequest };
