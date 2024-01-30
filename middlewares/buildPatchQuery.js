const buildPatchQuery = async (postId, updateTo) => {
  const joinedProps = Object.entries(updateTo).reduce(
    (acc, [key, val], idx, arr) => {
      const valueToSet = typeof updateTo[key] === 'string' ? `'${val}'` : val;
      const optionalComma = idx < arr.length - 1 ? ',' : '';
      return `${acc}${key}=${valueToSet}${optionalComma}`;
    },
    ''
  );
  const patchProps = Object.keys(updateTo).length !== 0 ? joinedProps : null;
  return `UPDATE post SET ${patchProps} WHERE id = ${postId}`;
};

module.exports = buildPatchQuery;
