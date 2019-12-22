import isObject from '../helpers/isObject';

const tabSize = 4;

const getSpaces = (nestedLevel, hasSign = false) => {
  const signShift = hasSign ? 2 : 0;
  return ' '.repeat(nestedLevel * tabSize - signShift);
};

const stringifyObject = (obj, level) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    const str = `${getSpaces(level)}${key}: ${obj[key]}`;
    acc.push(str);
    return acc;
  }, []).join('\n');
};

const getIniForChangedBeforeOrRemoved = (key, { beforeValue }, level) => {
  const spacesSigned = getSpaces(level, true);
  const spaces = getSpaces(level);
  return isObject(beforeValue)
    ? `${spacesSigned}- ${key}: {\n${stringifyObject(beforeValue, level + 1)}\n${spaces}}`
    : `${spacesSigned}- ${key}: ${beforeValue}`;
};

const getIniForChangedAfterOrAdded = (key, { newValue }, level) => (isObject(newValue)
  ? `${getSpaces(level, true)}+ ${key}: {\n${stringifyObject(newValue, level + 1)}\n${getSpaces(level)}}`
  : `${getSpaces(level, true)}+ ${key}: ${newValue}`);

const getIniForSame = (key, { beforeValue }, level) => (`${getSpaces(level)}${key}: ${beforeValue}`);

const formatterIni = (ast, level = 1) => {
  const theseKeys = Object.keys(ast);
  const strings = theseKeys.reduce((acc, key) => {
    if (ast[key].hasChildren) {
      acc.push(`${getSpaces(level)}${key}: {\n${formatterIni(ast[key].children, level + 1)}\n${getSpaces(level)}}`);
    } else {
      if (ast[key].isSame) {
        acc.push(getIniForSame(key, ast[key], level));
      }
      if (ast[key].isAdded) {
        acc.push(getIniForChangedAfterOrAdded(key, ast[key], level));
      }
      if (ast[key].isRemoved) {
        acc.push(getIniForChangedBeforeOrRemoved(key, ast[key], level));
      }
      if (ast[key].isChanged) {
        acc.push(getIniForChangedBeforeOrRemoved(key, ast[key], level));
        acc.push(getIniForChangedAfterOrAdded(key, ast[key], level));
      }
    }
    return acc;
  }, []);
  return strings.join('\n');
};

export default formatterIni;
