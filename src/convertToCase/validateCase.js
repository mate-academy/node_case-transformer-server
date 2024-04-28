const { availableCases } = require('../constants/availableCases');

function validateCase(toCase) {
  return availableCases.includes(toCase);
}

module.exports = { validateCase };
