
const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

const buildAST = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const keysAll = Array.from(new Set(beforeKeys.concat(afterKeys)));

  return keysAll.reduce((acc, key) => {
    const hasChildrenBefore = hasProp(before, key)
      && typeof before[key] === 'object'
      && before[key] !== null;
    const hasChildrenAfter = hasProp(after, key)
      && typeof after[key] === 'object'
      && after[key] !== null;
    const hasChildrenBoth = hasChildrenBefore && hasChildrenAfter;
    const beforeValueForSimple = hasProp(before, key) ? before[key] : null;
    const newValueForSimple = hasProp(after, key) ? after[key] : null;
    acc[key] = {
      isSame: hasProp(before, key) && hasProp(after, key) && before[key] === after[key],
      isAdded: !hasProp(before, key) && hasProp(after, key),
      isRemoved: hasProp(before, key) && !hasProp(after, key),
      isChanged: hasProp(before, key) && hasProp(after, key) && before[key] !== after[key],
      beforeValue: hasChildrenBoth ? null : beforeValueForSimple,
      newValue: hasChildrenBoth ? null : newValueForSimple,
      hasChildren: hasChildrenBoth,
      children: hasChildrenBoth ? buildAST(before[key], after[key]) : null,
    };
    return acc;
  }, {});
};

export default buildAST;
