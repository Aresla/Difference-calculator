import fs from 'fs';
import path from 'path';
import expect from 'expect';
import parsers from '../src/parsers';
import buildAST from '../src/buildAST';

test('should build AST', () => {
  const pathBefore = './__fixtures__/before.json';
  const pathAfter = './__fixtures__/after.json';
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
  const pathBefore = './__fixtures__/beforeNestedShort.json';
  const pathAfter = './__fixtures__/afterNestedShort.json';
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
