const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  userType: { type: String, required: true },
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  dob: { type: String, default: "" },
  mobile: { type: String, default: "+251" },
  address: { type: String, default: "" },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
