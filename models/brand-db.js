const db = require('../loaders/db');

module.exports = {
  getBrandData: async () => {
    const connection = await db();
    const [rows, fields] = await connection.query(
      'SELECT brand_name, name, caffeine FROM brand'
    );
    connection.end();
    return rows;
  }
};
