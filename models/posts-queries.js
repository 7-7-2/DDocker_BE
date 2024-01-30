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

const queries = {
  getPostDetail: `SELECT 
  a.brand, a.menu, a.post_title,size, a.shot,caffeine, a.photo, a.created_at, b.profileUrl, b.nickname, b.sum 
  FROM post a 
  LEFT JOIN user b 
  ON a.user_id = b.id 
  WHERE a.id=?`,
  registerPost: buildInsert('post', [
    'user_id',
    'brand',
    'menu',
    'post_title',
    'size',
    'shot',
    'caffeine',
    'photo'
  ]),
  deletePost: buildDelete('post', ['id']),
  writeComment: buildInsert('comment', ['user_id', 'post_id', 'content']),
  deleteComment: buildDelete('comment', ['post_id', 'id']),
  replyComment: buildInsert('reply', ['user_id', 'comment_id', 'content']),
  deleteReply: buildDelete('reply', ['id']),
  buildPatchQuery
};

module.exports = queries;
