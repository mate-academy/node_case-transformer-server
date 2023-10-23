// /**
//  * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
//  *
//  * @param {string} text
//  * @param {CaseName} originalCase
//  *
//  * @returns {string[]}
//  */
// function toWords(text, originalCase) {
//   if (
//     ['SNAKE', 'KEBAB', 'UPPER'].includes(originalCase)
//   ) {
//     return text.split(/[_-]/).map((str) => str.toLowerCase());
//   }

//   const words = [];
//   let lastChar = -1;

//   for (let i = 0; i < text.length; i++) {
//     if (
//       i === text.length - 1
//       || text[i + 1].toUpperCase() === text[i + 1]
//     ) {
//       const word = text
//         .slice(lastChar + 1, i + 1)
//         .toLowerCase();

//       lastChar = i;

//       words.push(word);
//     }
//   }

//   return words;
// }

// module.exports = {
//   toWords,
// };

/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @param {string} text
 * @param {CaseName} originalCase
 *
 * @returns {string[]}
 */
function toWords(text, originalCase) {
  if (['SNAKE', 'KEBAB', 'UPPER'].includes(originalCase)) {
    return text.split(/[_-]/).map((str) => str.toLowerCase());
  }

  const words = [];
  let wordStartIndex = 0;

  for (let i = 1; i < text.length; i++) {
    if (text[i].toUpperCase() === text[i]) {
      const word = text.slice(wordStartIndex, i).toLowerCase();
      words.push(word);
      wordStartIndex = i;
    }
  }

  const lastWord = text.slice(wordStartIndex).toLowerCase();
  words.push(lastWord);

  return words;
}

module.exports = {
  toWords,
};