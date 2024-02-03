const db = require('../loaders/db');

const executeQuery = async (sql, params) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const [row] = await getConn.query(sql, params);
  getConn.release();
  return row;
};

exports.getCoffeeInfoSum = async ({ getReq }) => {
  const params = [getReq];
  const result = await executeQuery(
    `
    SELECT brand, caffeine, SUM(caffeine) AS caffeineSum, COUNT(*) AS allCount
    FROM post
    WHERE user_id = ? AND DATE(created_at) = CURRENT_DATE
  `,
    params
  );
  return result;
};

exports.getDaySum = async ({ getReq }) => {
  const params = [getReq];
  const branchFuc = async date => {
    const sql = `
        SELECT COUNT(*) AS CountSum, SUM(caffeine) AS CaffeineSum
        FROM post
        WHERE user_id = ? AND ${date}(created_at) = ${date}(CURDATE())
      `;
    return await executeQuery(sql, params);
  };
  const year = await branchFuc('YEAR');
  const month = await branchFuc('MONTH');
  const week = await branchFuc('WEEK');

  return { year, month, week };
};

exports.getCalendar = async ({ getReq }) => {
  const params = [getReq];
  const sql = `
        SELECT DAY(created_at) as day, sum(caffeine) as CaffeineSum
        FROM post
        WHERE user_id = ? AND YEAR(created_at) = YEAR(CURRENT_DATE) AND MONTH(created_at) = MONTH   (CURRENT_DATE)
        GROUP BY DAY(created_at)
    `;
  return await executeQuery(sql, params);
};
