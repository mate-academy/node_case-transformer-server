function toCheckErrors(caseType, text) {
  const supportedCases = ['snake', 'kebab', 'camel', 'pascal', 'upper'];

  if (!text && !caseType) {
    return 'empty all';
  }

  if (!text && !supportedCases.includes(caseType.toLowerCase())) {
    return 'no text && wrong case';
  }

  if (!text) {
    return 'no text';
  }

  if (!caseType) {
    return 'not type';
  }

  return supportedCases.includes(caseType.toLowerCase())
    ? 'correct'
    : 'wrong case';
}

module.exports = { toCheckErrors };
