const router = require("express").Router();
const {add, list} = require("../controller/PlayerData.js")
const fs = require('fs');
import allowCors from "../middleware/cors.js";

router.post("/add", allowCors, add);
router.get("/list/:id", allowCors, list);

module.exports =router;