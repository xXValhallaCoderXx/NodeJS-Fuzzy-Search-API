const mongoose = require("mongoose");

//Tell Mongoose which promise library to use

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
};
