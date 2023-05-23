const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ClassSchema = new Schema({
  grade: String,
  section: Array,
});
module.exports = mongoose.model("Class", ClassSchema);
