const { Router } = require("express");
const { createUser, login, logout, signin, index, loginPage } = require("../controllers/user.controller");
const { isAuthJwt } = require("../middleware/auth");

const userRouter = Router();

userRouter.post("/create", createUser);

userRouter.post("/loginUser", login);

userRouter.get('/login', loginPage)

userRouter.get("/", isAuthJwt, index);

userRouter.get("/logout", logout);

userRouter.get("/signin", signin);

userRouter.get("/signin", signin);

module.exports = userRouter