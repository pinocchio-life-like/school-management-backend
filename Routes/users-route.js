const express = require("express");
const userRouter = express.Router();
const authentication = require("../controllers/UserController/users-controller");

userRouter.get("/", (req, res, next) => {
  console.log("Dashboard");
  res.status(201).json({ message: "DashBoard" });
});

userRouter.get("/", authentication.getUser);
userRouter.post("users/login", authentication.login);
userRouter.post("users/signup", authentication.signup);

userRouter.get("*", (req, res) => {
  res.status(404).send("This Route Does Not Exist", 404);
});

module.exports = userRouter;
