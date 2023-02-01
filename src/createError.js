function createError(errorArray) {
  const obj = {
    errors: [],
  };

  errorArray.forEach((error) => {
    obj.errors.push({
      message: error,
    });
  });

  return JSON.stringify(obj, null, 2);
}

module.exports = {
  createError,
};
