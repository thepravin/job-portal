const express = require("express");
const { register, login, logout } = require("../controllers/user.contorller");
const isAuthorized = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized, logout); // here we can not  get or pot info , so get

module.exports = router;
