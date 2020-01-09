import fs from 'fs';

test('should read and parse JSON file', () => {
  const pathToFile = './__fixtures__/after.json';
  const file = fs.readFileSync(pathToFile);
  const parsedFile = JSON.parse(file);
  expect(parsedFile).toStrictEqual({
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  });
});
