const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { multiQuery } = require("./search-queries");
const { checkParams } = require("./utils");

router.use(bodyParser.json());


router.get("/people-like-you", async (req, res) => {
  let result = await checkParams(req.query);
  if (!result[0]) {
    return res.status(200).send({
      success: false,
      data: `Query params: 'age', 'latitude', 'longitude', 'monthlyIncome', 'experienced'`
    });
  }
  var nameRes = await multiQuery(req.query, req.query.offset);
  return res.status(200).send({ success: true, data: nameRes });
});

module.exports = router;
