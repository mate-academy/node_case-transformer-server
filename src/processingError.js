/* eslint-disable max-len */
const procssingError = (text, formCase) => {
  const errorArray = [];
  const arrayCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!text) {
    errorArray.push(
      new Error(
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      ),
    );
  };

  if (!formCase) {
    errorArray.push(
      new Error(
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      ),
    );

    throw errorArray;
  };

  if (!arrayCases.includes(formCase)) {
    errorArray.push(
      new Error(
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      ),
    );
  };

  if (errorArray.length > 0) {
    throw errorArray;
  }
};

module.exports = { procssingError };
