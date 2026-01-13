const en = require('./enums');

function detectCase(req) {
  const isLowerCase = req.toLowerCase() === req;

  if (isLowerCase) {
    if (/^[a-z0-9]+(_[a-z0-9]+)*$/.test(req)) {
      return { ok: true, originalCase: en.casesEn.SNAKE };
    }

    if (/^[a-z0-9]+(-[a-z0-9]+)*$/.test(req)) {
      return { ok: true, originalCase: en.casesEn.KEBAB };
    }
  } else {
    if (/^[a-z]+(?:[A-Z][a-z0-9]*)*$/.test(req)) {
      return { ok: true, originalCase: en.casesEn.CAMEL };
    }

    if (/^[A-Z][a-z0-9]*(?:[A-Z][a-z0-9]*)*$/.test(req)) {
      return { ok: true, originalCase: en.casesEn.PASCAL };
    }

    if (/^[A-Z0-9]+(_[A-Z0-9]+)*$/.test(req)) {
      return { ok: true, originalCase: en.casesEn.UPPER };
    }
  }

  return { ok: false, data: [{ message: en.erEn.NOT_SUPPORTED_CASE }] };
}

module.exports = { detectCase };
