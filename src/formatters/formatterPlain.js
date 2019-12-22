import isObject from '../helpers/isObject';
import isString from '../helpers/isString';
import complexValue from '../constants/complexValue';

const getPlainForChanged = ({ beforeValue, newValue }, nodeWithPath) => {
  const returnValue = `Property ${nodeWithPath} was updated. From ${isObject(beforeValue)
    ? complexValue
    : beforeValue} to ${isObject(newValue)
    ? complexValue
    : newValue}`;
  return returnValue;
};

const getPlainForRemoved = (key, withPath) => `Property ${withPath} was removed`;

const getPlainForAdded = ({ newValue }, withPath) => (isObject(newValue)
  ? `Property '${withPath}' was added with value: ${complexValue}`
  : `Property '${withPath}' was added with value: ${isString(newValue) ? `'${newValue}'` : newValue}`);

const formatterPlain = (ast, pathToNode = []) => {
  const theseKeys = Object.keys(ast);
  const strings = theseKeys.reduce((acc, key) => {
    const node = ast[key];
    const {
      hasChildren, children, isAdded, isRemoved, isChanged,
    } = node;
    const nodeWithPath = [...pathToNode, key].join('.');
    if (hasChildren) {
      acc.push(formatterPlain(children, [...pathToNode, key]));
    }
    if (!hasChildren && isAdded) {
      acc.push(getPlainForAdded(ast[key], nodeWithPath));
    }
    if (!hasChildren && isRemoved) {
      acc.push(getPlainForRemoved(ast[key], nodeWithPath));
    }
    if (!hasChildren && isChanged) {
      acc.push(getPlainForChanged(ast[key], nodeWithPath));
    }
    return acc;
  }, []);
  return strings.join('\n');
};

export default formatterPlain;
