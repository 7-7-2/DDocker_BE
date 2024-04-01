const searchService = require('../services/search-service');

module.exports = {
  getUserInfo: async (req, res) => {
    const searchReq = req.params.nickname;
    const searchRes = await searchService.getUserInfo({ searchReq });

    return (
      searchRes &&
      res.status(200).json({ data: searchRes !== undefined ? searchRes : null })
    );
  },

  getUserInfoMore: async (req, res) => {
    const searchReq = [req.params.nickname, req.params.pageNum];
    const searchRes = await searchService.getUserInfoMore(searchReq);

    return (
      searchRes &&
      res.status(200).json({ data: searchRes !== undefined ? searchRes : null })
    );
  }
};
