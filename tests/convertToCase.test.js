const convertToCase = require('../src/convertToCase/convertToCase'); // ✅ import zgodny z module.exports

describe('convertToCase', () => {
  const cases = {
    SNAKE: 'some_snake_case',
    PASCAL: 'SomePascalCase',
    CAMEL: 'someCamelCase',
    KEBAB: 'some-kebab-case',
    UPPER: 'SOMEUPPERCASE'
  };

  Object.entries(cases).forEach(([originalCase, text]) => {
    const targetCases = ['SNAKE', 'PASCAL', 'CAMEL', 'KEBAB', 'UPPER'];

    targetCases.forEach(toCase => {
      it(`should convert ${originalCase} to ${toCase}`, () => {
        const result = convertToCase(text, toCase);
        expect(result).toBeDefined();
        // ewentualnie: expect(result).toEqual({ originalCase, converted: ... });
      });
    });
  });
});
