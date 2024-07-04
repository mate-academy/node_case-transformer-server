module.exports.getErrorCollector = () => {
  const errors = [];

  return {
    catchIfThrown(cb) {
      try {
        return cb();
      } catch (error) {
        if (error instanceof Error) {
          errors.push({ message: error.message });
        }
      }
    },

    getAll() {
      return errors.length ? errors : null;
    },
  };
};
