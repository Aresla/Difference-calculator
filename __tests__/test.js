import genDiff from '../src';

test('should print the difference for json files в формате INI', () => {
  const pathToBefore = './__fixtures__/before.json';
  const pathToAfter = './__fixtures__/after.json';
  const result = genDiff(pathToBefore, pathToAfter, 'ini');
  const resultString = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  expect(result).toBe(resultString);
});

test('should print the difference for nested json files в формате INI', () => {
  const pathToBefore = './__fixtures__/beforeNestedShort.json';
  const pathToAfter = './__fixtures__/afterNestedShort.json';
  const result = genDiff(pathToBefore, pathToAfter, 'ini');
  const resultString = `{
    common: {
        setting1: Value 1
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting3: {
            key: value
        }
    }
}`;
  expect(result).toBe(resultString);
});

test('should print the difference for yaml files', () => {
  const pathToBefore = './__fixtures__/before.yaml';
  const pathToAfter = './__fixtures__/after.yaml';
  const result = genDiff(pathToBefore, pathToAfter, 'ini');
  const resultString = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  expect(result).toBe(resultString);
});

test('should print the difference for nested json files в формате plain', () => {
  const pathToBefore = './__fixtures__/beforeNestedShort.json';
  const pathToAfter = './__fixtures__/afterNestedShort.json';
  const result = genDiff(pathToBefore, pathToAfter, 'plain');
  const resultString = `Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: false
Property 'common.setting3' was added with value: [complex value]`;
  expect(result).toBe(resultString);
});

test('should throw an error if file is not found', () => {
  const pathToAfter = './__fixtures__/afterNestedShort.json';
  expect(() => genDiff('/undefined', pathToAfter, 'plain')).toThrow();
});

test('should throw an error if formatter is incorrect', () => {
  const pathToBefore = './__fixtures__/beforeNestedShort.json';
  const pathToAfter = './__fixtures__/afterNestedShort.json';
  expect(() => genDiff(pathToBefore, pathToAfter, 'utrutrutr')).toThrow();
});
