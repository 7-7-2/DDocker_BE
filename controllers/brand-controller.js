const brandService = require('../services/brand-service');

module.exports = {
  getBrand: async (req, res) => {
    try {
      const data = await brandService.getBrandData();
      res.status(200).json({ success: 'ok', data: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getWeeklyPopularBrandMenu: async (req, res) => {
    const postReq = req.params.brand;
    const postRes = await brandService.getWeeklyPopularBrandMenu(postReq);
    return (
      postRes &&
      res.status(200).json({ data: postRes !== undefined ? postRes : null })
    );
  },
  getBrandRecentPosts: async (req, res) => {
    const postReq = req.params.brand;
    const postRes = await brandService.getBrandRecentPosts(postReq);
    return (
      postRes &&
      res.status(200).json({ data: postRes !== undefined ? postRes : null })
    );
  },
  getBrandPopularPosts: async (req, res) => {
    const postReq = req.params.brand;
    const postRes = await brandService.getBrandPopularPosts(postReq);
    return (
      postRes &&
      res.status(200).json({ data: postRes !== undefined ? postRes : null })
    );
  }
};
