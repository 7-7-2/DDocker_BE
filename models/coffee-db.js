const db = require('../loaders/db');

exports.getCoffeeInfoSum = async ({ getReq }) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const params = [getReq];
  const sql = `
    SELECT brand, SUM(caffeine)
    FROM post
    WHERE user_id = ?
    `;
  const [row] = await getConn.query(sql, params);
  getConn.release();
  return row;
};

exports.getDaySum = async ({ getReq }) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const params = [getReq];
  const sql = `
    SELECT
    YEAR(created_at) AS year,
    MONTH(created_at) AS month,
    WEEK(created_at) AS week,
    COUNT(*) AS count_per_unit,
    SUM(caffeine) AS sum_caffeine_per_unit
  FROM
    post
  GROUP BY
    year, month, week
  ORDER BY
    year, month, week;
      `;
};
