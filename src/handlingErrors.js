const handlingErrors = (text, caseName, res) => {
  const textStyles = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const checkTxtStyles = textStyles.every(style => caseName !== style);

  const wrapFunction = (children) => {
    res.statusCode = 400;

    res.end(JSON.stringify(children, null, 2));
  };

  /* eslint-disable max-len */

  switch (true) {
    case text === '' && caseName === null:
      return wrapFunction({
        errors: [
          {
            message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
          {
            message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
        ],
      });

    case checkTxtStyles && text === '':
      return wrapFunction((
        {
          errors: [
            {
              message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
            {
              message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            },
          ],
        }
      ));

    case text === '':
      return wrapFunction((
        {
          errors: [
            {
              message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
          ],
        }
      ));

    case caseName === null:
      return wrapFunction((
        {
          errors: [
            {
              message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
          ],
        }
      ));

    case checkTxtStyles:
      return wrapFunction((
        {
          errors: [
            {
              message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            },
          ],
        }
      ));
  }
};

module.exports = { handlingErrors };
