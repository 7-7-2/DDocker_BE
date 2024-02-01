const isNum = num => Number.isInteger(num);
const checkInt = (shot, caffeine) => {
  return isNum(shot) && isNum(caffeine);
};

const isNotEmpty = x => (x.trim() ? x : false);
const trimmer = arr => arr.every(elem => isNotEmpty(elem));

const validatePostForm = async form => {
  const { user_id, brand, menu, post_title, size, shot, caffeine, photo } =
    await form;
  const nums = checkInt(shot, caffeine);
  const validStrings = trimmer([user_id, brand, menu, post_title, size, photo]);
  const length = Object.keys(form).length === 8;

  return nums && validStrings && length;
};

module.exports = validatePostForm;
