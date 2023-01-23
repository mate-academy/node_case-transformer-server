const { availableCases } = require('./availableCases');
const {
  textIsMissing, caseIsMissing, caseIsNotSupported,
} = require('./errorMessages');

const validateRequest = (text, caseName) => {
  const request = { errors: [] };
  let isValid = true;

  if (!text) {
    isValid = false;

    request.errors.push({ message: textIsMissing });
  }

  if (!caseName) {
    isValid = false;
    request.errors.push({ message: caseIsMissing });
  }

  if (caseName && !availableCases.includes(caseName)) {
    isValid = false;

    request.errors.push({ message: caseIsNotSupported });
  }

  return [request, isValid];
};

module.exports = { validateRequest };
