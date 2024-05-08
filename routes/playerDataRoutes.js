const router = require("express").Router();
const {add, list,playerlist} = require("../controller/PlayerData.js")
const fs = require('fs');

router.post("/add", add);

router.get("/list/:id", list);

router.get("/playerlist/:category/:group", playerlist);

module.exports =router;