const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const {convertCSV} = require("./csv-parser");

router.use(bodyParser.json());

router.get("/people-like-you", (req, res) => {
  convertCSV(path.resolve(__dirname, "./data.csv")).then(data => {
    return res.status(200).send({ success: true, data });
  }).catch(err => {
    console.log("ERROR: ", err);
    return res.status(200).send({ success: false, data: null });
  })
  
});




module.exports = router;