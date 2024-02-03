const brandDB = require('../models/brand-db');

module.exports = {
  getBrandData: async (req, res) => {
    const result = await brandDB.getBrandData(req);
    return result ? result : Promise.reject('Failed to get brandData');
  }
};
