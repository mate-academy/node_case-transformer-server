const formatResponse = (args, result) => {
  return {
    convertedText: result.convertedText,
    originalCase: result.originalCase,
    originalText: args.text,
    targetCase: args.toCase,
  };
};

module.exports = { formatResponse };
