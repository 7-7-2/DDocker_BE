const brandService = require('../services/brand-service');

module.exports = {
  getBrand: async (req, res) => {
    try {
      const data = await brandService.getBrandData();
      res.json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
