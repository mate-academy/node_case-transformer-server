const en = require('./enums');

function splitCamelPascal(text) {
  const parts = text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z0-9])/g, '$1 $2')
    .split(' ')
    .filter(Boolean);

  return parts;
}

const normalize = {
  [en.casesEn.SNAKE]: (text) => text.split('_').filter(Boolean),
  [en.casesEn.KEBAB]: (text) => text.split('-').filter(Boolean),
  [en.casesEn.UPPER]: (text) => text.split('_').filter(Boolean),

  [en.casesEn.CAMEL]: (text) => splitCamelPascal(text),
  [en.casesEn.PASCAL]: (text) => splitCamelPascal(text),
};

module.exports = { normalize };
