import fs from 'fs';
import yaml from 'js-yaml';

test('should read and parse yaml file', () => {
  const pathToFile = './__fixtures__/after.yaml';
  const file = fs.readFileSync(pathToFile, 'utf8');
  const parsedFile = yaml.safeLoad(file);
  expect(parsedFile).toStrictEqual({
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  });
});
