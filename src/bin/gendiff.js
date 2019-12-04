#!/usr/bin/env node

import commander from 'commander';

const run = () => {
    const program = new commander.Command();
    let firstConfig, secondConfig, type;
    program.version('0.0.1')
        .arguments('<firstConfig> <secondConfig> [type]')
        .description('Compares two configuration files and shows a difference.')
        .option('-f, --format [type]', 'Output format')
        .action(function (first, second, t) {
            firstConfig = first;
            secondConfig = second;
            type = t;
        })
        .parse(process.argv);

    return program;
};

run();