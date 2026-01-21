function validate(text, toCase) {
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const error = { errors: [] };

    if (!text) {
        error.errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' })
    }

    if (!cases.includes(toCase) && toCase) {
        error.errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' })
    }

    if (!toCase) {
        error.errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' })
    }

    return error;
}

module.exports = {
    validate,
}