import * as fs from 'fs';
import * as path from 'path';
import parsers from './parsers';
import buildAST from './buildAST';
import formatterJSON from './formatters/formatterJson';
import formatterPlain from './formatters/formatterPlain';
import formatterIni from './formatters/formatterIni';

const genDiff = (pathToBefore, pathToAfter, formatter) => {
  const type = path.extname(pathToBefore);
  const fileBefore = fs.readFileSync(pathToBefore);
  const fileAfter = fs.readFileSync(pathToAfter);
  const before = parsers[type](fileBefore);
  const after = parsers[type](fileAfter);
  const ast = buildAST(before, after);
  if (formatter === 'ini') {
    return `{\n${formatterIni(ast)}\n}`;
  }
  if (formatter === 'plain') {
    return `${formatterPlain(ast)}`;
  }
  if (formatter === 'json') {
    return formatterJSON(ast);
  }
  throw new Error('unexpected formatter type');
};

export default genDiff;
