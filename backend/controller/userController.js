const usermodel = require("../models/userModel");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

// Register User
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await usermodel.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username Already Exist !!", status: false });
    }
    const emailCheck = await usermodel.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email Already Exist !!", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usermodel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

// Login User
exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const isUser = await usermodel.findOne({ username });
    if (!isUser) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    const isValidPassword = await bcrypt.compare(password, isUser.password);
    if (!isValidPassword) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    return res.json({ status: true, isUser });
  } catch (err) {
    next(err);
  }
};

// Get All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await usermodel
      .find({ _id: { $ne: req.params.id } })
      .select(["email", "username", "avatarImage", "_id"]);

    return res.json(users);
  } catch (err) {
    next(err);
  }
};

// Set Avatar
exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userdata = await usermodel.findByIdAndUpdate(
      userId,
      { isAvatarImageSet: true, avatarImage },
      { new: true }
    );

    return res.json({
      isSet : userdata.isAvatarImageSet,
      image : userdata.avatarImage
    })
  } catch (err) {
    next(err);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};