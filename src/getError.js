const getError = (messages) => {
  const errors = messages.map((message) => ({
    message,
  }));

  return errors;
};

module.exports = {
  getError,
};
