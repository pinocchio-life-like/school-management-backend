const USERS = [
  {
    id: "student",
    name: "user",
    email: "test@test.com",
    password: "1234",
  },
];
const getUser = (req, res, next) => {
  res.json({ users: USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  const createdUser = {
    name,
    email,
    password,
  };
  USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};
const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = USERS.find((user) => {
    user.email === email;
  });
  if (!identifiedUser || identifiedUser.password !== password) {
    return res.send("Could not find User");
  }
  res.json({ message: "logged in" });
};

exports.getUser = getUser;
exports.login = login;
exports.signup = signup;
