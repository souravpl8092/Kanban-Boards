const express = require("express");
const authRouter = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);

module.exports = authRouter;
