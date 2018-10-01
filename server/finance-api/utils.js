
let whitelist = [
  "age",
  "latitude",
  "longitude",
  "monthlyIncome",
  "experienced"
];


const checkParams = async params => {
  if (Object.keys(params).length === 0) {
    return false;
  }

  return Object.keys(params).map(param => {
    let isIncluded = whitelist.includes(param);
    if (isIncluded) {
      return true;
    }
    return false;
  });
};

module.exports = {
  checkParams
}