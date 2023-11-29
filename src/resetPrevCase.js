const { cases } = require('./cases');

const resetPrevCase = (textToEdit) => {
  let resetedText = textToEdit;
  let prevCase;

  switch (true) {
    case textToEdit.includes('_')
    && resetedText.split('').some(l => l === l.toUpperCase() && l !== '_'):
      resetedText = textToEdit.split('_').map(l => l.toLowerCase());
      prevCase = cases.UPPER;
      break;

    case textToEdit.includes('-'):
      resetedText = textToEdit.split('-').map(l => l.toLowerCase());
      prevCase = cases.KEBAB;
      break;

    case textToEdit.includes('_'):
      resetedText = textToEdit.split('_').map(l => l.toLowerCase());
      prevCase = cases.SNAKE;
      break;

    case resetedText.split('').some((l, i) => l === l.toUpperCase() && i === 0):
      resetedText = resetedText
        .split('')
        .map((l, i) => i !== 0 && l === l.toUpperCase()
          ? ` ${l.toLowerCase()}`
          : l.toLowerCase())
        .join('')
        .split(' ');
      prevCase = cases.PASCAL;
      break;

    case resetedText.split('').some((l, i) => l === l.toUpperCase() && i !== 0):
      resetedText = resetedText
        .split('')
        .map((l, i) => i !== 0 && l === l.toUpperCase()
          ? ` ${l.toLowerCase()}`
          : l)
        .join('')
        .split(' ');
      prevCase = cases.CAMEL;
      break;

    default:
      break;
  }

  return [resetedText, prevCase];
};

module.exports = { resetPrevCase };
