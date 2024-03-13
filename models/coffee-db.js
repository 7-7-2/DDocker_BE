const db = require('../loaders/db');

const executeQuery = async (sql, params) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const [row] = await getConn.query(sql, params);
  getConn.release();
  return row;
};

exports.getCoffeeInfoSum = async getReq => {
  const res = await executeQuery(
    `SELECT p.caffeineSum, p.allCount, JSON_ARRAYAGG(JSON_OBJECT('brand', s.brand, 'caffeine', s.caffeine)) AS item FROM (SELECT SUM(caffeine) AS caffeineSum, COUNT(*) AS allCount
    FROM post
    WHERE user_id = '${getReq}' AND DATE(created_at) = CURRENT_DATE) AS p 
    INNER JOIN (SELECT brand, caffeine
    FROM post
    WHERE user_id = '${getReq}' AND DATE(created_at) = CURRENT_DATE) AS s
  `
  );
  return res;
};

exports.getDaySum = async ({ getReq, date }) => {
  const params = [getReq];
  const result = await executeQuery(
    `
            SELECT COUNT(*) AS CountSum, CAST(COALESCE(SUM(caffeine), 0) AS INT) AS CaffeineSum
            FROM post
            WHERE user_id = ? AND ${date.query}
        `,
    params
  );
  return result;
};

exports.getCalendar = async ({ getReq }) => {
  const params = [getReq];
  const result = await executeQuery(
    `
        SELECT DAY(created_at) as day, CAST(COALESCE(SUM(caffeine), 0) as CaffeineSum
        FROM post
        WHERE user_id = ? AND YEAR(created_at) = YEAR(CURRENT_DATE) AND MONTH(created_at) = MONTH(CURRENT_DATE)
        GROUP BY DAY(created_at)
    `,
    params
  );
  return result;
};
