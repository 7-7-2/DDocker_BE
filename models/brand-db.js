const db = require('../loaders/db');
const BrandQueries = require('./brand-queries');

const connectAndQuery = async (...queryAndParam) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(...queryAndParam);
  getConn.release();
  return result;
};

module.exports = {
  getBrandData: async () => {
    const sql = `SELECT JSON_OBJECTAGG(brand_name, brand_items) AS coffee_menus
    FROM (
        SELECT brand_name, JSON_ARRAYAGG(
            JSON_OBJECT('brand', brand_name, 'caffeine', caffeine, 'menu', name)
        ) AS brand_items
        FROM brand
        GROUP BY brand_name
    ) AS temp`;
    const conn = await db();
    const getConn = await conn.getConnection();
    const result = await getConn.query(sql).catch(err => console.log(err));
    getConn.release();
    return result[0] ? result[0] : null;
  },
  getWeeklyPopularBrandMenu: async brandReq => {
    const params = [brandReq];
    const result = await connectAndQuery(
      BrandQueries.getWeeklyPopularBrandMenu,
      params
    );
    const data = result[0];
    return data && data;
  },
  getBrandRecentPosts: async brandReq => {
    const params = [brandReq];
    const result = await connectAndQuery(
      BrandQueries.getBrandRecentPosts,
      params
    );
    const data = result[0];
    return data && data;
  },
  getBrandPopularPosts: async brandReq => {
    const params = [brandReq];
    const result = await connectAndQuery(
      BrandQueries.getBrandPopularPosts,
      params
    );
    const data = result[0];
    return data && data;
  }
};
