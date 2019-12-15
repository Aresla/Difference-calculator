import * as fs from 'fs';
import * as path from 'path';
import { mapTypeToParser } from './parsers';

export const buildAST = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const keysAll = Array.from(new Set(beforeKeys.concat(afterKeys)));

  return keysAll.reduce((acc, key) => {
    acc[key] = {
      isSame: before.hasOwnProperty(key) && after.hasOwnProperty(key) && before[key] === after[key],
      isAdded: !before.hasOwnProperty(key) && after.hasOwnProperty(key),
      isRemoved: before.hasOwnProperty(key) && !after.hasOwnProperty(key),
      isChanged: before.hasOwnProperty(key) && after.hasOwnProperty(key) && before[key] !== after[key],
      beforeValue: before.hasOwnProperty(key) ? before[key] : null,
      newValue: after.hasOwnProperty(key) ? after[key] : null,
    };
    return acc;
  }, {});
};

export const stringify = (ast) => {
  const theseKeys = Object.keys(ast);
  const strings = theseKeys.reduce((acc, key) => {
    if (ast[key].isSame) {
      acc.push(`  ${key}: ${ast[key].beforeValue}`);
    }
    if (ast[key].isAdded) {
      acc.push(`+ ${key}: ${ast[key].newValue}`);
    }
    if (ast[key].isRemoved) {
      acc.push(`- ${key}: ${ast[key].beforeValue}`);
    }
    if (ast[key].isChanged) {
      acc.push(`+ ${key}: ${ast[key].newValue}`);
      acc.push(`- ${key}: ${ast[key].beforeValue}`);
    }
    return acc;
  }, []);
  return `{\n${strings.join('\n')}\n}`;
};

const genDiff = (pathToBefore, pathToAfter) => {
  const type = path.extname(pathToBefore);
  const fileBefore = fs.readFileSync(pathToBefore);
  const fileAfter = fs.readFileSync(pathToAfter);
  const before = mapTypeToParser[type](fileBefore);
  const after = mapTypeToParser[type](fileAfter);
  const ast = buildAST(before, after);
  return stringify(ast);
};

export default genDiff;
