const validation = (requestUrl) => {
  const message1 = `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;
  const message2 = `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;
  const message3 = `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`;

  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const messages = [];

  const getMessages = (condition, ...args) => {
    if (condition) {
      messages.push(...args);
    }
  };

  getMessages(requestUrl.trim() === '/', message1, message2);

  if (requestUrl.includes('?')) {
    const urlParts = requestUrl.split('?');

    const [originalText, queryParams] = urlParts;

    const params = new URLSearchParams(queryParams);
    const targetCase = params.get('toCase');

    const prepareText = originalText.slice(1);

    const condition1 = prepareText.length === 0;
    const condition2 = !targetCase;
    const condition3 = !cases.includes(targetCase);

    getMessages(condition1, message1);
    getMessages(condition2, message2);
    getMessages(condition3, message3);

    if (messages.length > 0) {
      return messages;
    }

    return {
      text: prepareText,
      target: targetCase,
    };
  }

  if (!requestUrl.includes('?')) {
    getMessages(true, message2);

    return messages;
  }
};

module.exports = {
  validation,
};
