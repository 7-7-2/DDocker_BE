const brandMap = new Map();
brandMap.set('starbucks', '스타벅스');
brandMap.set('ediya', '이디야');
brandMap.set('hollys', '할리스');
brandMap.set('angelinus', '엔젤리너스');
brandMap.set('paulbassett', '폴바셋');
brandMap.set('theventi', '더벤티');
brandMap.set('megacoffee', '메가커피');
brandMap.set('compose', '컴포즈커피');
brandMap.set('pascucci', '파스쿠찌');

const switchBrand = brand => {
  return brandMap.get(brand);
};

module.exports = switchBrand;
