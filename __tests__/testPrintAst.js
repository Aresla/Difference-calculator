import formatterIni from '../src/formatters/formatterIni';

test('should print AST', () => {
  const ast = {
    timeout: {
      isSame: false,
      isAdded: false,
      isRemoved: false,
      isChanged: true,
      beforeValue: 50,
      newValue: 20,
    },
  };
  const resultString = '  - timeout: 50\n  + timeout: 20';
  expect(formatterIni(ast)).toBe(resultString);
});
