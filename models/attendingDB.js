const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AttendingSchema = new Schema({
  grade: String,
  teacherId: String,
  teacherName: String,
});
module.exports = mongoose.model("Attending", AttendingSchema);
