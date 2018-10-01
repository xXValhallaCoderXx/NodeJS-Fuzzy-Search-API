const express = require("express");
const logger = require("morgan");
const app = express();

app.use(logger("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Acceptt"
  );
  next();
});

const financeAPI = require("./finance-api");

app.use("/api", financeAPI);


app.listen(process.env.PORT, () => {
  console.log("Mode: ", process.env.NODE_ENV);
  console.log("Listening On Port: ", process.env.PORT);
});

module.exports = {
  app
};