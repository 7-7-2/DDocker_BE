const brandDB = require('../models/brand-db');

module.exports = {
  getBrandData: async req => {
    const result = await brandDB.getBrandData(req);
    return result ? result : Promise.reject('Failed to get brandData');
  },
  getWeeklyPopularBrandMenu: async req => {
    const result = await brandDB.getWeeklyPopularBrandMenu(req);
    return result
      ? result
      : Promise.reject('Failed to get weekly popular brand menu');
  },
  getBrandRecentPosts: async req => {
    const result = await brandDB.getBrandRecentPosts(req);
    return result ? result : Promise.reject('Failed to get brand recent posts');
  },
  getBrandPopularPosts: async req => {
    const result = await brandDB.getBrandPopularPosts(req);
    return result
      ? result
      : Promise.reject('Failed to get brand popular posts');
  }
};
