const express = require("express");
const register = require("./register");
const login = require("./login");
const editProfile = require("./editProfile");
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/editProfile", editProfile)

module.exports = router;