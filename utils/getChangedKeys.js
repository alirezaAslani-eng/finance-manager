/**
 *
 * @param {object} originalObj
 * @param {object} changedObj
 * @returns {any}
 */
function getChangedKeys(originalObj={}, changedObj={}) {
  const diff = {};

  Object.keys(originalObj).forEach((key) => {
    if (changedObj[key]) {
      if (changedObj[key] !== originalObj[key]) {
        diff[key] = changedObj[key];
      }
    }
  });

  return diff;
}

export default getChangedKeys;
