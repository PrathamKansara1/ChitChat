const express = require('express');
const { registerUser, loginUser, getAllUsers, setAvatar, logOut } = require('../controller/userController');

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/allusers/:id").get(getAllUsers);
router.route("/setavatar/:id").post(setAvatar);
router.route("/logout/:id").get(logOut);


module.exports = router;