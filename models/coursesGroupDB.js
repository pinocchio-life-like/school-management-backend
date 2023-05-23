const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CoursesGroupSchema = new Schema({
  courseGroupName: String,
  offered: Array,
  offeredId: Array,
  notOffered: Array,
  grade: String,
});
module.exports = mongoose.model("CoursesGroup", CoursesGroupSchema);
