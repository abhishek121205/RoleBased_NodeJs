const { user } = require("../model/user.schema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { UserName, role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.create({ UserName, role, password: hashedPassword });
    console.log("data inserted..");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { UserName, password } = req.body;
  let User = await user.findOne({ UserName: UserName });
  // console.log(User);
  if (User) {
    const match = await bcrypt.compare(password, User.password);
    if (match) {
      console.log("enter successfully");

      let payload = {
        UserName: User.UserName,
        role: User.role,
      };

      var token = jwt.sign(payload, "it's private");
      // console.log(token);
      return res.cookie("token", token).redirect("/");
    } else {
      console.log("wrong password");
      return res.redirect("/login");
    }
  } else {
    console.log("wrong Name");
    return res.redirect("/login");
  }
};

const loginPage = async (req, res) => {
  return res.render("login");
};

const index = (req, res) => {
  let { token } = req.cookies;
  var decoded = jwt.verify(token, "it's private");
  return res.render('index', { decoded })
};

const signin = async (req, res) => {
  await user
    .find({})
    .then((data) => {
      return res.render("register", { data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

module.exports = { createUser, login, logout, signin, loginPage, index };
