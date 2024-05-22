const queries = {
  getNoticesList: `SELECT id AS postId, title, DATE_FORMAT(created_at, '%Y.%m.%d') AS date FROM support WHERE type = 'notice' ORDER BY created_at DESC`,
  getNoticeDetail: `SELECT title, content , DATE_FORMAT(created_at, '%Y.%m.%d') AS date FROM support WHERE type = "notice" AND id = ?`,
  getFAQ: `SELECT id AS postId, title, content, DATE_FORMAT(created_at, '%Y.%m.%d') AS date FROM support WHERE type = 'FAQ' ORDER BY created_at DESC`
};

module.exports = queries;
