const db = require('../loaders/db');

exports.getCoffeeInfoSum = async ({ getReq }) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const params = [getReq];
  const sql = `
    SELECT brand, SUM(caffeine), COUNT(*)
    FROM post
    WHERE user_id = ? AND DATE(created_at) = CURRENT_DATE
    `;
  const [row] = await getConn.query(sql, params);
  getConn.release();
  return row;
};

exports.getDaySum = async ({ getReq }) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const params = [getReq];
  const getCoffeeInfoByYear = async () => {
    const sql = `
        SELECT COUNT(*) AS CountSum, SUM(caffeine) AS CaffeineSum
        FROM post
        WHERE user_id = ? AND YEAR(created_at) = YEAR(CURDATE())
    `;
    const [row] = await getConn.query(sql, params);
    return row;
  };
  const getCoffeeInfoByMonth = async () => {
    const sql = `
        SELECT COUNT(*) AS CountSum, SUM(caffeine) AS CaffeineSum
        FROM post
        WHERE user_id = ? AND MONTH(created_at) = MONTH(CURDATE())
    `;
    const [row] = await getConn.query(sql, params);
    return row;
  };
  const getCoffeeInfoByWeek = async () => {
    const sql = `
        SELECT COUNT(*) AS CountSum, SUM(caffeine) AS CaffeineSum
        FROM post
        WHERE user_id = ? AND WEEK(created_at) = WEEK(CURDATE())
    `;
    const [row] = await getConn.query(sql, params);
    return row;
  };

  const resultByYear = await getCoffeeInfoByYear({ getReq });
  const resultByMonth = await getCoffeeInfoByMonth({ getReq });
  const resultByWeek = await getCoffeeInfoByWeek({ getReq });

  getConn.release();
  return { resultByYear, resultByMonth, resultByWeek };
};
