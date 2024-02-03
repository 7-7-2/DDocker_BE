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

exports.getDaySum = async ({ getReq, date }) => {
  const params = [getReq];
  const result = await executeQuery(
    `
        SELECT COUNT(*) AS CountSum, SUM(caffeine) AS CaffeineSum
        FROM post
        WHERE user_id = ? AND ${date}(created_at) = ${date}(CURDATE())
      `,
    params
  );
  return result;
};

exports.getCalendar = async ({ getReq }) => {
  const params = [getReq];
  const result = await executeQuery(
    `
        SELECT DAY(created_at) as day, sum(caffeine) as CaffeineSum
        FROM post
        WHERE user_id = ? AND YEAR(created_at) = YEAR(CURRENT_DATE) AND MONTH(created_at) = MONTH   (CURRENT_DATE)
        GROUP BY DAY(created_at)
    `,
    params
  );
  return result;
};
