const en = require('./enums');

const capitalize = (word) =>
  word[0].toUpperCase() + word.slice(1).toLowerCase();

const camelLike = (text, firstUpper) => {
  const first = firstUpper ? capitalize(text[0]) : text[0].toLowerCase();
  const rest = text.slice(1).map((w) => capitalize(w));

  return [first, ...rest].join('');
};

const convert = {
  [en.casesEn.SNAKE]: (text) => text.map((w) => w.toLowerCase()).join('_'),
  [en.casesEn.KEBAB]: (text) => text.map((w) => w.toLowerCase()).join('-'),
  [en.casesEn.CAMEL]: (text) => camelLike(text, false),
  [en.casesEn.PASCAL]: (text) => camelLike(text, true),
  [en.casesEn.UPPER]: (text) => text.map((w) => w.toUpperCase()).join('_'),
};

module.exports = { convert };
