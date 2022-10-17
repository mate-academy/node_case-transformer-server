const {
  convertToCase,
} = require('../src/convertToCase');

describe('convertToCase', () => {
  const cases = {
    SNAKE: 'getting_things_done',
    PASCAL: 'GettingThingsDone',
    CAMEL: 'gettingThingsDone',
    KEBAB: 'getting-things-done',
    UPPER: 'GETTING_THINGS_DONE',
  };

  Object.entries(cases).forEach(([toCase, expected]) => {
    Object.entries(cases).forEach(([originalCase, text]) => {
      it(`should convert ${originalCase} to ${toCase}`, async() => {
        const result = convertToCase(text, toCase);

        expect(result)
          .toEqual({
            originalCase,
            convertedText: expected,
          });
      });
    });
  });
});
