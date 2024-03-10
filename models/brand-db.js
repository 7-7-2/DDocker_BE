const db = require('../loaders/db');

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
  }
};
