const { cases } = require('./cases');

const transformText = (resetedText, param) => {
  let editedText;
  let textToReturn;

  switch (param) {
    case cases.SNAKE:
      textToReturn = resetedText.join('_');
      break;

    case cases.KEBAB:
      textToReturn = resetedText.join('-');
      break;

    case cases.CAMEL:
      editedText = resetedText.map((word, i) => i !== 0
        ? `${word[0].toUpperCase()}${word.slice(1)}`
        : word);
      textToReturn = editedText.join('');
      break;

    case cases.PASCAL:
      editedText = resetedText.map((word) => `${word[0].toUpperCase()}${word.slice(1)}`);
      textToReturn = editedText.join('');
      break;

    case cases.UPPER:
      editedText = resetedText.map(word => word.toUpperCase());
      textToReturn = editedText.join('_');
      break;

    default:
      break;
  }

  return textToReturn;
};

module.exports = { transformText };
