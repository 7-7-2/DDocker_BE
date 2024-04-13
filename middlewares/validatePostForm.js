const isNum = num => Number.isInteger(num);
const checkInt = (shot, caffeine) => {
  return isNum(shot) && isNum(caffeine);
};

const isNotEmpty = x => (x.trim() ? x : false);
const trimmer = arr => arr.every(elem => isNotEmpty(elem));

const validatePostForm = async form => {
  const { brand, menu, size, shot, caffeine, photo } = await form[1];
  const nums = checkInt(shot, caffeine);
  const validStrings = trimmer([brand, menu, size, photo]);
  const length = Object.keys(form[1]).length === 8;
  return nums && validStrings && length;
};

module.exports = validatePostForm;
