import * as fs from 'fs';

const genDiff = (pathToBefore, pathToAfter) => {

    const fileBefore = fs.readFileSync(pathToBefore);
    const fileAfter = fs.readFileSync(pathToAfter);

    const before = JSON.parse(fileBefore);
    const after = JSON.parse(fileAfter);

    const ast = buildAST(before, after);
    return stringify(ast);
};

export const buildAST = (before, after) => {
    const beforeKeys = Object.keys(before);
    const afterKeys = Object.keys(after);
    const keysAll =  Array.from(new Set(beforeKeys.concat(afterKeys)));

    return keysAll.reduce((acc, key) => {
        acc[key] = {
            isSame: before.hasOwnProperty(key) && after.hasOwnProperty(key) && before[key] === after[key],
            isAdded: !before.hasOwnProperty(key) && after.hasOwnProperty(key),
            isRemoved: before.hasOwnProperty(key) && !after.hasOwnProperty(key),
            isChanged: before.hasOwnProperty(key) && after.hasOwnProperty(key) && before[key] !== after[key],
            previosValue: before.hasOwnProperty(key) ? before[key] : null,
            newValue: after.hasOwnProperty(key) ? after[key] : null,
        };
        return acc;
    }, {});
};

export const stringify = (ast) => {
    const keys = Object.keys(ast);
    const strings =  keys.reduce((acc, key) => {
        if (ast[key].isSame) {
            acc.push(`  ${key}: ${ast[key].previosValue}`);
        }
        if (ast[key].isAdded) {
            acc.push(`+ ${key}: ${ast[key].newValue}`);
        }
        if (ast[key].isRemoved) {
            acc.push(`- ${key}: ${ast[key].previosValue}`);
        }
        if (ast[key].isChanged) {
            acc.push(`+ ${key}: ${ast[key].newValue}`);
            acc.push(`- ${key}: ${ast[key].previosValue}`);
        }
        return acc;
    }, []);
    return `{\n${strings.join('\n')}\n}`
};

export default genDiff;