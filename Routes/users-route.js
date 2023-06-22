const express = require("express");
const { check } = require("express-validator");
const userRouter = express.Router();
const usersController = require("../controllers/UserController/users-controller");
// const fileUpload = require("../middleware/file-upload");

userRouter.get("/users", usersController.getUsers);

userRouter.post(
  "/users/signup",
  // fileUpload.single("image"),
  [
    check("userType").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersController.signup
);

userRouter.post("/users/login", usersController.login);
userRouter.patch("/users/updateUser/:email", usersController.editUser);
userRouter.patch(
  "/users/changePassword/:email",
  usersController.changePassword
);

userRouter.get("*", (req, res) => {
  res.status(404).send("This Route Does Not Exist", 404);
});

module.exports = userRouter;
