const buildInsert = (table, columns) => {
  const replacement = '?, '.repeat(columns.length - 1) + '?';
  return `INSERT INTO ${table} ( ${columns.join(
    ','
  )} ) VALUES ( ${replacement} )`;
};

const buildDelete = (table, params) => {
  const predi = params.reduce(
    (acc, cur, idx) => (acc += `${idx !== 0 ? ' AND ' : ''}` + `${cur} = ?`),
    ''
  );
  return `DELETE FROM ${table} WHERE ${predi}`;
};

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

const buildGetFollowList = followType => {
  const listType =
    followType === 'following' ? 'followed_user_id' : 'following_user_id';
  const filterFrom =
    followType === 'following' ? 'following_user_id' : 'followed_user_id';
  return `
  SELECT a.profile_url, a.nickname, a.sum
  FROM user a
  LEFT JOIN(  SELECT b.${listType}
              FROM follows b
              LEFT JOIN user a
              ON a.public_id = b.${filterFrom}
              WHERE a.public_id = ?
            ) list
            WHERE list.${listType} = a.public_id`;
};

module.exports = {
  buildInsert,
  buildDelete,
  buildPatchQuery,
  buildGetFollowList
};
