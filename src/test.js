import fs from 'fs';
import genDiff, { stringify } from './index';


test('should 1 be equal 1', () => {
  expect(1).toBe(1);
});

test('should read file', () => {
  const pathToFile = './src/__fixtures__/json/after.json';
  const file = fs.readFileSync(pathToFile);
  const parsedFile = JSON.parse(file);
  expect(parsedFile).toStrictEqual({
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  });
});

test('should get the difference', () => {
  const pathBefore = './src/__fixtures__/json/before.json';
  const pathAfter = './src/__fixtures__/json/after.json';
  const diff = genDiff(pathBefore, pathAfter);
  expect(diff).toStrictEqual({
    timeout: {
      isSame: false,
      isAdded: false,
      isRemoved: false,
      isChanged: true,
      previosValue: 50,
      newValue: 20,
    },
  });
});

test('should print AST', () => {
  const ast = {
    timeout: {
      isSame: false,
      isAdded: false,
      isRemoved: false,
      isChanged: true,
      previosValue: 50,
      newValue: 20,
    },
  };
  const resultString = `{
+ timeout: 20
- timeout: 50
}`;
  expect(stringify(ast)).toBe(resultString);
});

test('should print the difference', () => {
  const pathToBefore = './src/__fixtures__/json/before.json';
  const pathToAfter = './src/__fixtures__/json/after.json';
  const result = genDiff(pathToBefore, pathToAfter);
  const resultString = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;
  expect(result).toBe(resultString);
});
