const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AttendanceSchema = new Schema({
  attendanceId: String,
  attendanceDate: String,
  attendanceStatus: String,
  attainingTeacher: String,
  grade: String,
  section: String,
});
module.exports = mongoose.model("Attendance", AttendanceSchema);
