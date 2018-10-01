const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
  searchName,
  searchAge,
  dynamicQuery,
  demoQuery
} = require("./search-queries");
router.use(bodyParser.json());

router.get("/people-like-you", async (req, res) => {
  var nameRes = await demoQuery(req.query, req.query.offset);

  return res.status(200).send({ success: false, data: nameRes });
});

module.exports = router;
