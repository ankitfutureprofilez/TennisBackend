const router = require("express").Router();
const {add, list} = require("../controller/PlayerData.js")
const fs = require('fs');

router.post("/add", add);
router.get("/list/:id", list);




module.exports =router;