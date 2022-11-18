'use strict';

const prepareResponseData = (urlComponents, infoAboutTextConvertating) => {
  const data = {
    originalCase: infoAboutTextConvertating.originalCase,
    targetCase: urlComponents.targetCase,
    originalText: urlComponents.originalText,
    convertedText: infoAboutTextConvertating.convertedText,
  };

  return JSON.stringify(data);
};

module.exports = {
  prepareResponseData,
};
