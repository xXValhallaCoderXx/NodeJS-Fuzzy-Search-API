const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {convertCSV} = require("./csv-parser");

const {searchQueryParser} = require("./utils");

router.use(bodyParser.json());

router.get("/people-like-you", (req, res) => {
  // convertCSV(path.resolve(__dirname, "./data.csv")).then(data => {
  //   return res.status(200).send({ success: true, data });
  // }).catch(err => {
  //   console.log("ERROR: ", err);
  //   return res.status(200).send({ success: false, data: null });
  // })
  const searchTerms = searchQueryParser(req.query);
  console.log("SEARCHTERMS: ", searchTerms);
  return res.status(200).send({ success: true, data: null });
});




module.exports = router;