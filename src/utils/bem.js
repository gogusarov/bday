export const BEMNormalize = (block, element, modifier) => {
  let className = block;

  if (!block && typeof block !== 'string') {
    throw new Error(`Block is not defined: ${block}`);
  }

  if (element && typeof element === 'string') {
    className += `__${element}`;
  }

  if (modifier && typeof modifier === 'string') {
    className += `--${modifier}`;
  }

  return className;
};