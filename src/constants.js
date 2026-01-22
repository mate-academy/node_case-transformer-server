const ErrorMessages = {
  NoText: { message: 'Text to convert is required. Correct request is: '
  + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
  NoToCase: { message: '"toCase" query param is required. '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
  InvalidToCase: { message: 'This case is not supported. '
  + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
};

const availiableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const PORT = 5701;
const HOST = 'localhost';

module.exports = {
  ErrorMessages, availiableCases, PORT, HOST,
};
