const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TeacherSchema = new Schema({
  teacherId: String,
  teacherName: String,
  competitionalLevel: String,
  grade: Array,
  status: String,
  coursesId: Array,
  assignedTo: Array,
});
module.exports = mongoose.model("Teacher", TeacherSchema);
