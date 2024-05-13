const router = require("express").Router();
const {add,playerlist} = require("../controller/PlayerData.js")
const fs = require('fs');
router.post("/add", add);
router.get('/playerlist/:category:group', playerlist);

module.exports =router;