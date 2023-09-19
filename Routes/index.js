const express = require("express");
const authController = require("../Controller/authController");
const router = express.Router();
const auth = require("../middleware/auth");
router.get("/test", (req, res) => res.json({ msg: "working!" }));

//user

//register
router.post("/register", authController.register);
//login
router.post("/login", authController.login);

//logout
router.post("/logout", auth, authController.logout);

//refresh
router.get("/refresh", authController.refresh);

//blog
//crud
//create
//read
//read blog by id
//update
//delete

//comment
//create comment
//read comments by blog id

module.exports = router;
