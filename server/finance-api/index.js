const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {searchName} = require("./search-queries");
router.use(bodyParser.json());

router.get("/people-like-you", async (req, res) => {
  const esResponse = await searchName("Kendra", 0);
  return res.status(200).send({ success: true, data: esResponse });
});

module.exports = router;