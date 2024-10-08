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
  return `UPDATE post SET ${patchProps} WHERE public_id='${postId}'`;
};

const buildGetFollowList = followType => {
  const listType =
    followType === 'following' ? 'followed_user_id' : 'following_user_id';
  const filterFrom =
    followType === 'following' ? 'following_user_id' : 'followed_user_id';
  return `
  SELECT a.profileUrl as url, a.nickname, a.sum as caffeine , a.public_id as userId
  FROM user a
  INNER JOIN(  SELECT b.${listType}
              FROM follows b
              LEFT JOIN user c
              ON c.public_id = b.${filterFrom}
              WHERE c.public_id = ?
              LIMIT ?, 10
            ) list
            WHERE list.${listType} = a.public_id`;
};

module.exports = {
  buildInsert,
  buildDelete,
  buildPatchQuery,
  buildGetFollowList
};
