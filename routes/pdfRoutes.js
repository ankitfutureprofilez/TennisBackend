const router = require("express").Router();
const {pdf} = require("../controller/tennis.js")
const fs = require('fs');

router.post("/pdf", pdf);


module.exports =router;