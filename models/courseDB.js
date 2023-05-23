const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  courseName: String,
  grade: String,
  courseId: String,
  offered: String,
  teacherId: String,
});
module.exports = mongoose.model("Course", CourseSchema);
