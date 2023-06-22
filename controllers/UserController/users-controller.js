const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../../models/http-error");
const User = require("../../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { email, password, userId, userType, userName, dob, mobile, address } =
    req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    userType,
    email,
    userId,
    userName,
    // image: req.file.path,
    password: hashedPassword,
    dob,
    mobile,
    address,
    // places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        email: createdUser.email,
        userType: createdUser.userType,
        userId: createdUser.userId,
        userName: createdUser.userName,
      },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.userId,
    email: createdUser.email,
    userType: createdUser.userType,
    userName: createdUser.userName,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.userId,
        userName: existingUser.userName,
        email: existingUser.email,
        userType: existingUser.userType,
        dob: existingUser.dob,
        mobile: existingUser.mobile,
        address: existingUser.address,
      },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: existingUser.userId,
    userName: existingUser.userName,
    email: existingUser.email,
    userType: existingUser.userType,
    dob: existingUser.dob,
    mobile: existingUser.mobile,
    address: existingUser.address,
    token: token,
  });
};
const editUser = async (req, res, next) => {
  const { userName, dob, mobile, address } = req.body;

  const email = req.params.email;
  try {
    const filter = { email: email };
    const update = {
      $set: {
        userName: userName,
        dob: dob,
        mobile: mobile,
        address: address,
      },
    };
    const options = { upsert: true };
    await User.updateOne(filter, update, options);
    res.status(201).json({ success: true });
  } catch (err) {
    res.send(new HttpError("Couldnt Register", 404));
  }
};

const changePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { password } = req.body;
  const email = req.params.email;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  try {
    const filter = { email: email };
    const update = {
      $set: {
        password: hashedPassword,
      },
    };
    const options = { upsert: true };
    await User.updateOne(filter, update, options);
    res.status(201).json({ success: true });
  } catch (err) {
    res.send(new HttpError("Couldnt Update", 404));
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.editUser = editUser;
exports.changePassword = changePassword;
