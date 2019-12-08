#!/usr/bin/env node

import commander from 'commander';
import genDiff from '../index';

const run = () => {
  const program = new commander.Command();
  let pathToFirst; let pathToSecond;
  // let type;
  program.version('0.0.1')
    .arguments('<pathToFirstFile> <pathToSecondFile> [type]')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .action((first, second) => {
      pathToFirst = first;
      pathToSecond = second;
      // type = t;
    })
    .parse(process.argv);
  const result = genDiff(pathToFirst, pathToSecond);
  console.log(result);
  // return result;
};

run();
