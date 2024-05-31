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
brandMap.set('tomntoms', '탐앤탐스');
brandMap.set('coffeebean', '커피빈');
brandMap.set('mammoth', '매머드커피');
brandMap.set('private', '나만의 카페');
brandMap.set('banapresso', '바나프레소');

const switchBrand = brand => {
  return brandMap.get(brand);
};

module.exports = switchBrand;
