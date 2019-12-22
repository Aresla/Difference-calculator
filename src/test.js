/* eslint-disable quotes */
import fs from 'fs';
import yaml from 'js-yaml';
import * as path from 'path';
import genDiff from './index';
import buildAST from './buildAST';
import parsers from './parsers';
import formatterIni from './formatters/formatterIni';

test('should 1 be equal 1', () => {
  expect(1).toBe(1);
});

test('should read and parse JSON file', () => {
  const pathToFile = './src/__fixtures__/json/after.json';
  const file = fs.readFileSync(pathToFile);
  const parsedFile = JSON.parse(file);
  expect(parsedFile).toStrictEqual({
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  });
});

test('should read and parse yaml file', () => {
  const pathToFile = './src/__fixtures__/yaml/after.yaml';
  const file = fs.readFileSync(pathToFile, 'utf8');
  const parsedFile = yaml.safeLoad(file);
  expect(parsedFile).toStrictEqual({
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  });
});


test('should build AST', () => {
  const pathBefore = './src/__fixtures__/json/before.json';
  const pathAfter = './src/__fixtures__/json/after.json';
  const type = path.extname(pathBefore);
  const fileBefore = fs.readFileSync(pathBefore);
  const fileAfter = fs.readFileSync(pathAfter);
  const before = parsers[type](fileBefore);
  const after = parsers[type](fileAfter);
  const ast = buildAST(before, after, type);
  expect(ast).toStrictEqual({
    host: {
      isSame: true,
      isAdded: false,
      isRemoved: false,
      isChanged: false,
      beforeValue: 'hexlet.io',
      newValue: 'hexlet.io',
      children: null,
      hasChildren: false,
    },
    timeout: {
      isSame: false,
      isAdded: false,
      isRemoved: false,
      isChanged: true,
      beforeValue: 50,
      newValue: 20,
      children: null,
      hasChildren: false,
    },
    proxy: {
      isSame: false,
      isAdded: false,
      isRemoved: true,
      isChanged: false,
      beforeValue: '123.234.53.22',
      newValue: null,
      children: null,
      hasChildren: false,
    },
    verbose: {
      isSame: false,
      isAdded: true,
      isRemoved: false,
      isChanged: false,
      newValue: true,
      beforeValue: null,
      children: null,
      hasChildren: false,
    },
    follow: {
      isSame: false,
      isAdded: false,
      isRemoved: true,
      isChanged: false,
      beforeValue: false,
      newValue: null,
      children: null,
      hasChildren: false,
    },
  });
});

test('should build AST for nested json files', () => {
  const pathBefore = './src/__fixtures__/json/beforeNestedShort.json';
  const pathAfter = './src/__fixtures__/json/afterNestedShort.json';
  const type = path.extname(pathBefore);
  const fileBefore = fs.readFileSync(pathBefore);
  const fileAfter = fs.readFileSync(pathAfter);
  const before = parsers[type](fileBefore);
  const after = parsers[type](fileAfter);
  const ast = buildAST(before, after, type);
  expect(ast).toStrictEqual({
    common: {
      isSame: false,
      isAdded: false,
      isRemoved: false,
      isChanged: true,
      hasChildren: true,
      beforeValue: null,
      newValue: null,
      children: {
        follow: {
          isSame: false,
          isAdded: true,
          isRemoved: false,
          isChanged: false,
          beforeValue: null,
          newValue: false,
          hasChildren: false,
          children: null,
        },
        setting1: {
          isSame: true,
          isAdded: false,
          isRemoved: false,
          isChanged: false,
          beforeValue: 'Value 1',
          newValue: 'Value 1',
          hasChildren: false,
          children: null,
        },
        setting3: {
          isSame: false,
          isAdded: true,
          isRemoved: false,
          isChanged: false,
          beforeValue: null,
          newValue: {
            key: 'value',
          },
          hasChildren: false,
          children: null,
        },
        setting6: {
          isSame: false,
          isAdded: false,
          isRemoved: false,
          isChanged: true,
          beforeValue: null,
          newValue: null,
          hasChildren: true,
          children: {
            key: {
              isSame: true,
              isAdded: false,
              isRemoved: false,
              isChanged: false,
              beforeValue: 'value',
              newValue: 'value',
              hasChildren: false,
              children: null,
            },
            ops: {
              isSame: false,
              isAdded: true,
              isRemoved: false,
              isChanged: false,
              beforeValue: null,
              newValue: 'vops',
              hasChildren: false,
              children: null,
            },
          },
        },
      },
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
      beforeValue: 50,
      newValue: 20,
    },
  };
  const resultString = `  - timeout: 50\n  + timeout: 20`;
  expect(formatterIni(ast)).toBe(resultString);
});

test('should print the difference for json files в формате INI', () => {
  const pathToBefore = './src/__fixtures__/json/before.json';
  const pathToAfter = './src/__fixtures__/json/after.json';
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
  const pathToBefore = './src/__fixtures__/json/beforeNestedShort.json';
  const pathToAfter = './src/__fixtures__/json/afterNestedShort.json';
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
  const pathToBefore = './src/__fixtures__/yaml/before.yaml';
  const pathToAfter = './src/__fixtures__/yaml/after.yaml';
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
  const pathToBefore = './src/__fixtures__/json/beforeNestedShort.json';
  const pathToAfter = './src/__fixtures__/json/afterNestedShort.json';
  const result = genDiff(pathToBefore, pathToAfter, 'plain');
  const resultString = `Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: false
Property 'common.setting3' was added with value: [complex value]`;
  expect(result).toBe(resultString);
});
