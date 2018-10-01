const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { multiQuery } = require("./search-queries");

router.use(bodyParser.json());

let whitelist = [
  "age",
  "latitude",
  "longitude",
  "monthlyIncome",
  "experienced"
];

router.get("/people-like-you", async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return res.status(200).send({
      success: false,
      data: `Query params: "age", "latitude", "longitude", "monthlyIncome", "experienced"`
    });
  }
  let result = await checkParams(req.query);
  if (!result[0]) {
    return res.status(200).send({
      success: false,
      data: `Query params: "age", "latitude", "longitude", "monthlyIncome", "experienced"`
    });
  }
  var nameRes = await multiQuery(req.query, req.query.offset);
  return res.status(200).send({ success: true, data: nameRes });
});

const checkParams = params => {
  return Object.keys(params).map(param => {
    let isIncluded = whitelist.includes(param);
    if (isIncluded) {
      return true;
    }
    return false;
  });
};

module.exports = router;
