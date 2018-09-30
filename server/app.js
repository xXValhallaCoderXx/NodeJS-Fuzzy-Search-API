const express = require("express");

const app = express();
const search = require("./search");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Acceptt"
  );
  next();
});

app.get("/search", async (req, res) => {
  const { term, offset } = req.query;
  let something = await search.queryTerm(term, offset);
  return res.status(200).send({ success: true, data: something });
});

app.listen(process.env.PORT, () => {
  console.log("Mode: ", process.env.NODE_ENV);
  console.log("Listening On Port: ", process.env.PORT);
});
