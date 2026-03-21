function prepareErrors(errorsArray) {
  return errorsArray.map((msg) => ({ message: msg }));
}

module.exports = {
  prepareErrors,
};
