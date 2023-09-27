const express = require("express");
const authController = require("../Controller/authController");
const blogController = require("../Controller/blogController");
const commentController = require("../Controller/commentController");
const router = express.Router();
const auth = require("../middleware/auth");

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
router.post("/blog", auth, blogController.create);

//read
//get all
router.get("/blog/all", auth, blogController.getAll);
//

//read blog by id
router.get("/blog/:id", auth, blogController.getById);
//update
router.put("/blog", auth, blogController.update);

//delete
router.delete("/blog/:id", auth, blogController.delete);

//comment

//create comment
router.post("/comment", auth, commentController.create);
//read comments by blog id
router.get("/comment/:id", auth, commentController.getById);

module.exports = router;
