class ErrorCase {
  caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  convertErrorMessage = '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>';

  originalTextError = `Text to convert is required. Correct request is: "${this.convertErrorMessage}".`;

  originalCaseError = `"toCase" query param is required. Correct request is: "${this.convertErrorMessage}".`;

  caseTypesError = `This case is not supported. Available cases: ${this.caseTypes.join(', ')}.`;

  hasError(originalText, originalCase) {
    return (
      !originalText || !originalCase || !this.caseTypes.includes(originalCase)
    );
  }

  getError(originalText, originalCase) {
    const errors = [];

    if (!originalText) {
      errors.push(this.originalTextError);
    }

    if (!originalCase) {
      errors.push(this.originalCaseError);
    } else if (!this.caseTypes.includes(originalCase)) {
      errors.push(this.caseTypesError);
    }

    return errors.map((error) => ({ message: error }));
  }
}

const errorCase = new ErrorCase();

module.exports = {
  errorCase,
};
