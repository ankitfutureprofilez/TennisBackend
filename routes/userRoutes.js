const router = require("express").Router();
const {login} = require("../controller/UserController")
const fs = require('fs');

router.post("/login", login);


module.exports =router;