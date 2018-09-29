require("../config");

const express = require("express");
const logger = require("morgan");
//const FileStreamRotator = require('file-stream-rotator');

const app = express();

// const logDirectory = path.resolve(__dirname, "../logs");

// // ensure log directory exists
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// const accessLogStream = FileStreamRotator.getStream({
//   date_format: 'YYYYMMDD',
//   filename: path.join(logDirectory, 'access-%DATE%.log'),
//   frequency: 'daily',
//   verbose: false
// });

// // setup the logger
// app.use(logger('combined', {stream: accessLogStream}))

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

module.exports = app;