const { publisherClient } = require('../loaders/redis');
const supportService = require('../services/support-service');

const getSupportList = async (req, res) => {
  const { type } = req.params;
  if (type === 'notice') {
    try {
      const cacheNoticesList = await publisherClient.get('noticesList');
      const data = !cacheNoticesList && (await supportService.getNoticesList());
      res.status(200).json({ success: 'ok', data: data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    return;
  }
  if (type === 'FAQ') {
    try {
      const cacheFAQData = await publisherClient.get('FAQData');
      const data = !cacheFAQData && (await supportService.getFAQ());
      res.status(200).json({ success: 'ok', data: data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    return;
  }
  return;
};

const getNoticeDetail = async (req, res) => {
  const { postId } = req.params;
  const result = await supportService.getNoticeDetail(Number(postId));
  return result && res.status(200).json({ success: 'ok', data: result });
};

module.exports = {
  getSupportList,
  getNoticeDetail
};
