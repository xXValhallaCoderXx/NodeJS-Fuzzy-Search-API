const csv = require("csvtojson");

const convertCSV = file => {
  return new Promise((resolve, reject) => {
    csv()
      .fromFile(file)
      .then(jsonObj => {
        //console.log(jsonObj);
        if(jsonObj){
          resolve({
            success: true,
            data: jsonObj
          });
        }else {
          resolve({
            success: false,
            data: "Error..."
          });
        }
      
      })
  });
};

module.exports = {
  convertCSV
}