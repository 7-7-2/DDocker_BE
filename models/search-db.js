const db = require('../loaders/db');
const connectAndQuery = async (...queryAndParam) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(...queryAndParam);
  getConn.release();
  return result;
};
exports.getSearchList = async ({ searchReq }) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const sql = `
    SELECT profileUrl as url, nickname, sum as caffeine, public_id as userId
    FROM user
    WHERE LOWER(nickname) LIKE LOWER(?) LIMIT 5
    `;
  const params = [`%${searchReq}%`];
  const result = await getConn.query(sql, params);
  const data = result[0];
  getConn.release();
  return data;
};
//getSearchList 검색결과 제외(offset => 0으로 요청시 동일)
exports.getSearchListMore = async searchReq => {
  const [searchWord, pageNum] = searchReq;
  const offset = pageNum && pageNum * 5;

  const sql = `
  SELECT profileUrl as url, nickname, sum as caffeine, public_id as userId
  FROM user
  WHERE LOWER (nickname) LIKE LOWER(?) LIMIT ?, 5
`;
  const params = [`%${searchWord}%`, Number(offset)];
  const result = await connectAndQuery(sql, params);
  const data = result[0];
  return (
    data && {
      results: data,
      next: data.length < 5 ? undefined : Number(pageNum) + 1
    }
  );
};
