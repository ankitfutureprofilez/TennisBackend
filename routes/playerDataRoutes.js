const router = require("express").Router();
const {add,playerlist,particularplayer} = require("../controller/PlayerData.js")
const fs = require('fs');
router.post("/add", add);
router.get('/playerlist/:category:group', playerlist);
router.get('/particularplayer/:category:group/:reg',particularplayer );


module.exports =router;