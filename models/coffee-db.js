const db = require('../loaders/db');

exports.getCoffeeInfoSum = async ({ getReq }) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const params = [getReq];
  const sql = `
    SELECT brand, caffeine
    FROM post
    WHERE user_id = ? AND DATE(created_at) = CURRENT_DATE
  `;
  const [row] = await getConn.query(sql, params);
  const sql2 = `
    SELECT SUM(caffeine), count(*)
    FROM post
    WHERE user_id = ? AND DATE(created_at) = CURRENT_DATE
  `;
  const [sumRow] = await getConn.query(sql2, params);
  getConn.release();
  return { sumData: sumRow, mapItem: row };
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
      SELECT COUNT(*), SUM(caffeine) AS CaffeineSum
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

exports.getCalendar = async ({ getReq }) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const params = [getReq];
  const sql = `
          SELECT sum(caffeine) as CaffeineSum
          FROM post
          WHERE user_id = ? AND DATE(created_at) = CURRENT_DATE
      `;
  const [row] = await getConn.query(sql, params);
  if (row && row[0]) {
    const caffeineSum = row[0].CaffeineSum;
    if (caffeineSum >= 300) {
      row[0].color = 'red';
    } else {
      row[0].color = 'blue';
    }
  }
  getConn.release();
  return row;
};
