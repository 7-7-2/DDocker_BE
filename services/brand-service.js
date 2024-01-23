const brandDB = require('../models/brand-db');

module.exports = {
  getBrandData: async () => {
    try {
      return await brandDB.getBrandData();
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching brand data');
    }
  }
};
