const supportDB = require('../models/support-db');

const getNoticesList = async req => {
  const result = await supportDB.getNoticesList();
  return result ? result : await Promise.reject('Failed to get notice List');
};

const getNoticeDetail = async req => {
  const result = await supportDB.getNoticeDetail(req);
  return result ? result : await Promise.reject('Failed to get notice Detail');
};

const getFAQ = async () => {
  const result = await supportDB.getFAQ();
  return result ? result : await Promise.reject('Failed to get FAQ');
};

module.exports = { getNoticesList, getNoticeDetail, getFAQ };
