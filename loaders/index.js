const expressLoader = require('./express')
const db = require('./db')

module.exports = async ({ expressApp }) => {
    await db()
    console.log('DB_INIT_BY_LOADER');
    await expressLoader({ app: expressApp });
    console.log('EXPRESS_INIT_BY_LOADER');
  }